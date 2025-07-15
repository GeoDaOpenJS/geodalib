// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { GeometryCollection } from '@geoda/common';

import {
  BinaryGeometryType,
  getGeometryCollectionFromBinaryGeometries,
} from '../geometry/binary-geometry';
import { initWASM } from '../init';

/**
 * Type of Distance based Neighbors from binary geometries arguments.
 */
type DistanceNeighborsFromBinaryGeometriesProps = {
  distanceThreshold: number;
  isMile?: boolean;
  binaryGeometryType: BinaryGeometryType;
  binaryGeometries: BinaryFeatureCollection[];
};

/**
 * Calculates the neighbors within a distance band for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsFromBinaryGeometriesProps} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export async function getDistanceNeighborsFromBinaryGeometries({
  distanceThreshold,
  isMile = false,
  binaryGeometryType,
  binaryGeometries,
}: DistanceNeighborsFromBinaryGeometriesProps): Promise<number[][]> {
  if (!binaryGeometries || binaryGeometries.length === 0) {
    return [];
  }

  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollectionFromBinaryGeometries(
    binaryGeometryType,
    binaryGeometries,
    wasmInstance
  );

  const neighbors = await getDistanceNeighborsFromGeomCollection({
    geomCollection,
    distanceThreshold,
    isMile,
  });

  return neighbors;
}

export async function getDistanceNeighborsFromGeomCollection({
  geomCollection,
  distanceThreshold,
  isMile = false,
}: {
  geomCollection: GeometryCollection;
  distanceThreshold: number;
  isMile?: boolean;
}): Promise<number[][]> {
  const wasmInstance = await initWASM();
  const neighbors: number[][] = [];
  if (geomCollection) {
    const result = wasmInstance.getDistanceWeights(geomCollection, distanceThreshold, isMile);
    for (let i = 0; i < result.size(); ++i) {
      const nbrs = result.get(i);
      const nbrIndices: number[] = Array(nbrs.size());
      for (let j = 0, nbrSize = nbrs.size(); j < nbrSize; ++j) {
        nbrIndices[j] = nbrs.get(j);
      }
      neighbors[i] = nbrIndices;
    }
  }
  return neighbors;
}

export type DistanceThresholds = {
  minDistance: number;
  maxDistance: number;
  maxPairDistance: number;
};

export type DistanceThresholdsProps = {
  isMile?: boolean;
  binaryGeometryType: BinaryGeometryType;
  binaryGeometries: BinaryFeatureCollection[];
};

/**
 * Get the distance thresholds for a given set of geometries or latitude/longitude arrays:
 * The thresholds are calculated based on the minimum, maximum, and maximum pair distances.
 * - the minimum threshold is the minimum distance that guarantees that at least one geometry has one neighbor.
 * - the maximum threshold is the maximum distance that guarantees that every geometry has at least one neighbor.
 * - the maximum pair threshold is the maximum distance between any two geometries.
 *
 * The distances are calculated as the haversine distance between the centroids of the geometries.
 * The units of the thresholds are in kilometers or miles.
 *
 * ## Example
 * ```ts
 * import { getDistanceThresholds } from '@geoda/core';
 *
 * const geometries = [
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
 *   { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
 * ];
 *
 * const thresholds = await getDistanceThresholds({
 *   binaryGeometryType: 'Point',
 *   binaryGeometries: geometries,
 * });
 *
 * console.log(thresholds);
 * ```
 */
export async function getDistanceThresholds({
  isMile = false,
  binaryGeometryType,
  binaryGeometries,
}: DistanceThresholdsProps): Promise<DistanceThresholds> {
  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollectionFromBinaryGeometries(
    binaryGeometryType,
    binaryGeometries,
    wasmInstance
  );
  if (geomCollection) {
    const thresValues = wasmInstance.getDistanceThresholds(geomCollection, isMile);
    return {
      minDistance: thresValues.get(0),
      maxDistance: thresValues.get(1),
      maxPairDistance: thresValues.get(2),
    };
  }
  return {
    minDistance: 0,
    maxDistance: 0,
    maxPairDistance: 0,
  };
}
