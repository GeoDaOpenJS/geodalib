// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { getGeometryCollection, polygonToFeature, SpatialGeometry } from './utils';
import { initWASM } from '../init';
import { Feature } from 'geojson';

/**
 * Get a cartogram of the given geometries and values. The cartogram is a set of buffers around the given geometries.
 * The radius of the buffers is proportional to the values.
 *
 * ## Example
 * ```ts
 * const geoms = [
 *   { type: 'Point', coordinates: [0, 0] },
 *   { type: 'Point', coordinates: [1, 1] },
 * ];
 *
 * const values = [1, 2];
 *
 * const cartogram = await getCartogram(geoms, values);
 *
 * console.log(cartogram);
 * ```
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
  const result = await wasm.cartogram(
    geometryCollection,
    valuesVec,
    iterations,
    numberOfPointsPerCircle
  );

  const circles = result.getCircles();
  const x = result.getX();
  const y = result.getY();
  const radius = result.getRadius();

  // convert VectorPolygon to GeoJSON
  const features: Array<Feature> = [];
  for (let i = 0; i < circles.size(); i++) {
    const polygon = circles.get(i);
    const feature = await polygonToFeature(polygon);
    feature.properties = {
      x: x.get(i),
      y: y.get(i),
      radius: radius.get(i),
    };
    features.push(feature);
  }

  return features;
}
