import {BinaryFeatureCollection} from '@loaders.gl/schema';

import {
  BinaryGeometryType,
  getGeometryCollectionFromBinaryGeometries
} from '../geometry/binary-geometry';
import {initWASM} from '../init';

/**
 * Type of Contiguity Neighbors from binary geometries arguments.
 */
type ContiguityNeighborsFromBinaryGeometriesProps = {
  binaryGeometryType: BinaryGeometryType;
  binaryGeometries: BinaryFeatureCollection[];
  useCentroids: boolean;
  isQueen: boolean;
  precisionThreshold?: number;
  orderOfContiguity?: number;
  includeLowerOrder?: boolean;
};

/**
 * Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsFromBinaryGeometriesProps} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export async function getContiguityNeighborsFromBinaryGeometries({
  binaryGeometryType,
  binaryGeometries,
  isQueen,
  useCentroids,
  precisionThreshold = 0.0,
  orderOfContiguity = 1,
  includeLowerOrder = false
}: ContiguityNeighborsFromBinaryGeometriesProps): Promise<number[][]> {
  if (!binaryGeometries || binaryGeometries.length === 0) {
    return [];
  }

  const neighbors: number[][] = [];

  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollectionFromBinaryGeometries(
    binaryGeometryType,
    binaryGeometries,
    wasmInstance
  );

  if (geomCollection) {
    const result =
      useCentroids || binaryGeometryType.point || binaryGeometryType.line
        ? wasmInstance.getPointContiguityWeights(
            geomCollection,
            isQueen,
            precisionThreshold,
            orderOfContiguity,
            includeLowerOrder
          )
        : wasmInstance.getPolygonContiguityWeights(
            geomCollection,
            isQueen,
            precisionThreshold,
            orderOfContiguity,
            includeLowerOrder
          );
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
