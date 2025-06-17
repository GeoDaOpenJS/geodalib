import { getGeometryCollection, SpatialGeometry } from './utils';
import { initWASM } from '../init';
import { Feature } from 'geojson';
import { getBuffers } from './buffer';
import { DistanceUnit } from '@geoda/common';

/**
 * Get a cartogram of the given geometries and values.
 * The cartogram is a set of buffers around the given geometries.
 * The radius of the buffers is proportional to the values.
 * The cartogram is a set of buffers around the given geometries.
 *
 * @param geoms The geometries to get the cartogram of
 * @param values The values to use for the cartogram
 * @param iterations The number of iterations to run the cartogram algorithm
 * @param radiusCompensation The compensation factor for the radius. This is used to compensate for the fact that the radius is in the unit of degrees, but we want to use it in the unit of kilometers.
 * @param numberOfPointsPerCircle The number of points per circle. This is used to control the granularity of the buffers.
 * @returns The cartogram as a GeoJSON FeatureCollection
 */
export async function getCartogram(
  geoms: SpatialGeometry,
  values: number[],
  iterations: number = 100,
  radiusCompensation: number = 1.0,
  numberOfPointsPerCircle: number = 20
): Promise<Feature[]> {
  const wasm = await initWASM();

  // Convert values array to VectorDouble
  const valuesVec = new wasm.VectorDouble();
  valuesVec.resize(values.length, 0);
  for (let i = 0; i < values.length; i++) {
    valuesVec.set(i, values[i]);
  }

  const geometryCollection = await getGeometryCollection({ geometries: geoms });

  // Call the WASM cartogram function
  const result = await wasm.cartogram(geometryCollection, valuesVec, iterations);

  // convert CartogramResult to GeoJSON
  const features: Array<Feature> = [];

  const numberOfPoints = result.getX().size();

  for (let i = 0; i < numberOfPoints; i++) {
    const lat = result.getY().get(i);
    const lng = result.getX().get(i);
    let radius = result.getRadius().get(i);

    if (!radius || isNaN(radius)) {
      radius = values[i];
    }

    // Convert radius from degrees to kilometers using Haversine formula
    // At the equator, 1 degree is approximately 111.32 km
    const radiusInKM = radius * 111.32 * radiusCompensation;

    const feature: Feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      properties: {
        radius,
      },
    };

    // do a buffer with the radius in meters for every point
    const buffer = await getBuffers({
      geoms: [feature],
      bufferDistance: radiusInKM,
      distanceUnit: DistanceUnit.KM,
      pointsPerCircle: numberOfPointsPerCircle,
    });

    features.push(numberOfPoints > 1 ? buffer[0] : feature);
  }

  return features;
}
