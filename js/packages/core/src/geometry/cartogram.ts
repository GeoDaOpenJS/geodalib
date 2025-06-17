import { getGeometryCollection, SpatialGeometry } from './utils';
import { initWASM } from '../init';
import { Feature } from 'geojson';

/**
 * Get a cartogram of the given geometries and values.
 * The cartogram is a set of buffers around the given geometries.
 * The radius of the buffers is proportional to the values.
 * The cartogram is a set of buffers around the given geometries.
 *
 * @param geoms The geometries to get the cartogram of
 * @param values The values to use for the cartogram
 * @param iterations The number of iterations to run the cartogram algorithm
 * @param numberOfPointsPerCircle The number of points per circle. This is used to control the granularity of the buffers.
 * @returns The cartogram as a GeoJSON FeatureCollection
 */
export async function getCartogram(
  geoms: SpatialGeometry,
  values: number[],
  iterations: number = 100,
  numberOfPointsPerCircle: number = 30
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

    // create a circle with radius radius at lng, lat using 20 points on the circle and connect the points to form a polygon
    const points = [];
    for (let i = 0; i < numberOfPointsPerCircle; i++) {
      const angle = (i / numberOfPointsPerCircle) * 2 * Math.PI;
      const x = lng + radius * Math.cos(angle);
      const y = lat + radius * Math.sin(angle);
      points.push([x, y]);
    }
    // close the polygon
    points.push(points[0]);

    const feature: Feature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [points],
      },
      properties: {
        radius,
      },
    };

    features.push(feature);
  }

  return features;
}
