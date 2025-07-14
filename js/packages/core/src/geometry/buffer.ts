// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { Feature } from 'geojson';
import { initWASM } from '../init';
import { getGeometryCollection, SpatialGeometry, polygonToFeature } from './utils';
import { DistanceUnit, lengthToMeters } from '@geoda/common';

/**
 * The options for getting the buffers
 */
export type GetBuffersOptions = {
  /**
   * The geometries to get the buffers See {@link SpatialGeometry}
   */
  geoms: SpatialGeometry;
  /**
   * The distance of the buffer, use with distanceUnit e.g. 100 KM or 10 mile
   */
  bufferDistance: number;
  /**
   * The unit of the distance. See {@link DistanceUnit}
   */
  distanceUnit: DistanceUnit;
  /**
   * The number of points per circle. This determines the granularity of the buffer.
   * More points will result in a smoother buffer but will also increase the memory usage.
   */
  pointsPerCircle?: number;
};

/**
 * Get the buffers of the geometries
 *
 * ## Example
 * ```ts
 * const geoms = [
 *   {
 *     type: 'Feature',
 *     geometry: { type: 'Point', coordinates: [100, 0] },
 *   },
 * ];
 *
 * const buffers = await getBuffers({
 *   geoms: geoms,
 *   bufferDistance: 10,
 *   distanceUnit: DistanceUnit.Mile,
 *   pointsPerCircle: 10,
 * });
 * ```
 *
 * @param options The options for getting the buffers. See {@link GetBuffersOptions}
 * @returns The buffers of the geometries
 */
export async function getBuffers({
  geoms,
  bufferDistance,
  distanceUnit,
  pointsPerCircle = 10,
}: GetBuffersOptions) {
  await initWASM();

  // convert to UTM so we can use the unit of meter or mile
  const convertToUTM = true;
  const fixPolygon = true;

  const dist = lengthToMeters(bufferDistance, distanceUnit);

  const geometryCollection = await getGeometryCollection({
    geometries: geoms,
    convertToUTM,
    fixPolygon,
  });

  const result: Array<Feature> = [];

  for (let i = 0; i < geometryCollection.size(); ++i) {
    const buffer = geometryCollection.buffer(i, dist, pointsPerCircle);
    result.push(await polygonToFeature(buffer));
  }

  return result;
}
