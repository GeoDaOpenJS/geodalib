// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { GeometryCollection } from '@geoda/common';
import { initWASM } from '../init';
import { SpatialGeometry, getGeometryCollection } from './utils';

/**
 * The type of the geometries used in the GeoDaLib
 */
export type SpatialJoinGeometries = SpatialGeometry;

/**
 * The type of the props for spatialJoin
 * @param leftGeometries - the left geometries
 * @param rightGeometries - the right geometries
 */
export type SpatialJoinProps = {
  leftGeometries: SpatialJoinGeometries;
  rightGeometries: SpatialJoinGeometries;
};

/**
 * Spatial join two geometries. The result is an array of arrays, where each sub-array contains the indexes of the geometries (right) that intersect.
 *
 * @example
 * ```ts
 * const leftGeometries = [
 *   { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
 * ];
 * const rightGeometries = [
 *   { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 1 } },
 * ];
 * const joinIndexes = await spatialJoin({ leftGeometries, rightGeometries });
 * ```
 */
export async function spatialJoin({
  leftGeometries,
  rightGeometries,
}: SpatialJoinProps): Promise<number[][]> {
  if (!leftGeometries || !rightGeometries) {
    return [];
  }
  try {
    const leftGeomCollection: GeometryCollection = await getGeometryCollection({
      geometries: leftGeometries,
    });

    const rightGeomCollection: GeometryCollection = await getGeometryCollection({
      geometries: rightGeometries,
    });

    const joinIndexes = await spatialJoinGeometryCollection({
      leftGeomCollection,
      rightGeomCollection,
    });

    return joinIndexes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * The type of the props for spatialJoinGeometryCollection
 * @param leftGeomCollection - the left geometry collection
 * @param rightGeomCollection - the right geometry collection
 */
export type SpatialJoinGeometryCollectionProps = {
  leftGeomCollection: GeometryCollection;
  rightGeomCollection: GeometryCollection;
};

/**
 * Spatial join two geometry collections
 * @param props - the props for spatialJoinGeometryCollection see {@link SpatialJoinGeometryCollectionProps}
 * @returns the join indexes
 */
export async function spatialJoinGeometryCollection({
  leftGeomCollection,
  rightGeomCollection,
}: SpatialJoinGeometryCollectionProps): Promise<number[][]> {
  const result: number[][] = [];
  const wasmInstance = await initWASM();
  const joinIndexes = wasmInstance.spatialJoin(leftGeomCollection, rightGeomCollection);
  for (let i = 0; i < joinIndexes.size(); i++) {
    const joinIndex = joinIndexes.get(i);
    const resultRow: number[] = [];
    for (let j = 0; j < joinIndex.size(); j++) {
      resultRow.push(joinIndex.get(j));
    }
    result.push(resultRow);
  }
  return result;
}
