// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { getGeometryCollection } from './utils';
import { initWASM } from '../init';
import { SpatialGeometry } from './utils';
import { DistanceUnit } from '@geoda/common';

/**
 * Get the area of the geometry
 *
 * @example
 * ```ts
 * const geoms = [
 *   {
 *     type: 'Feature',
 *     geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] },
 *     properties: { index: 0 },
 *   },
 * ];
 * const area = await getArea(geoms, DistanceUnit.KM);
 * ```
 *
 * @param geoms - The geometry to get the area of
 * @param distanceUnit - The unit of the distance
 * @returns The area of the geometry
 */
export async function getArea(geoms: SpatialGeometry, distanceUnit: DistanceUnit) {
  await initWASM();

  // use UTM with meter unit
  const convertToUTM = true;

  const geometryCollection = await getGeometryCollection({
    geometries: geoms,
    convertToUTM,
  });

  const size = geometryCollection.size();
  const promises = Array.from({ length: size }, (_, i) => geometryCollection.getArea(i));
  const areasInMeter = await Promise.all(promises);

  return areasInMeter.map(areaInMeter => {
    if (distanceUnit === DistanceUnit.KM) {
      return areaInMeter / 1000000;
    } else if (distanceUnit === DistanceUnit.Mile) {
      return areaInMeter / 1609.34;
    }
    return areaInMeter;
  });
}

/**
 * Get the length of the geometry
 *
 * @example
 * ```ts
 * const geoms = [
 *   { type: 'Feature', geometry: { type: 'LineString', coordinates: [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]] }, properties: { index: 0 } },
 * ];
 * const length = await getLength(geoms, DistanceUnit.KM);
 * ```
 */
export async function getLength(geoms: SpatialGeometry, distanceUnit: DistanceUnit) {
  await initWASM();

  const convertToUTM = true;

  const geometryCollection = await getGeometryCollection({
    geometries: geoms,
    convertToUTM,
  });

  const size = geometryCollection.size();
  const promises = Array.from({ length: size }, (_, i) => geometryCollection.getLength(i));
  const lengthsInMeter = await Promise.all(promises);

  return lengthsInMeter.map(lengthInMeter => {
    if (distanceUnit === DistanceUnit.KM) {
      return lengthInMeter / 1000;
    } else if (distanceUnit === DistanceUnit.Mile) {
      return lengthInMeter / 1609.34;
    }
    return lengthInMeter;
  });
}

/**
 * Get the perimeter of the geometry
 *
 * @example
 * ```ts
 * const geoms = [
 *   { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
 * ];
 * const perimeter = await getPerimeter(geoms, DistanceUnit.KM);
 * ```
 */
export async function getPerimeter(geoms: SpatialGeometry, distanceUnit: DistanceUnit) {
  await initWASM();

  const convertToUTM = true;

  const geometryCollection = await getGeometryCollection({
    geometries: geoms,
    convertToUTM,
  });

  const size = geometryCollection.size();
  const promises = Array.from({ length: size }, (_, i) => geometryCollection.getPerimeter(i));
  const perimetersInMeter = await Promise.all(promises);

  return perimetersInMeter.map(perimeterInMeter => {
    if (distanceUnit === DistanceUnit.KM) {
      return perimeterInMeter / 1000;
    } else if (distanceUnit === DistanceUnit.Mile) {
      return perimeterInMeter / 1609.34;
    }
    return perimeterInMeter;
  });
}
