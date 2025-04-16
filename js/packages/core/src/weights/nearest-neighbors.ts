import { BinaryFeatureCollection } from '@loaders.gl/schema';
import { GeometryCollection } from '@geoda/common';
import {
  BinaryGeometryType,
  getGeometryCollectionFromBinaryGeometries,
} from '../geometry/binary-geometry';
import { initWASM } from '../init';

/**
 * Type of Nearest Neighbors from binary geometries arguments.
 */
type NearestNeighborsFromBinaryGeometriesProps = {
  k: number;
  binaryGeometryType: BinaryGeometryType;
  binaryGeometries: BinaryFeatureCollection[];
};

/**
 * Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsFromBinaryGeometriesProps} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export async function getNearestNeighborsFromBinaryGeometries({
  k,
  binaryGeometryType,
  binaryGeometries,
}: NearestNeighborsFromBinaryGeometriesProps): Promise<number[][]> {
  if (!binaryGeometries || binaryGeometries.length === 0) {
    return [];
  }

  const wasmInstance = await initWASM();
  const geomCollection = await getGeometryCollectionFromBinaryGeometries(
    binaryGeometryType,
    binaryGeometries,
    wasmInstance
  );

  const neighbors = await getNearestNeighborsFromGeomCollection({
    k,
    geomCollection,
  });

  return neighbors;
}

/**
 * Calculates the nearest neighbors for a given set of geometries.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export async function getNearestNeighborsFromGeomCollection({
  k,
  geomCollection,
}: {
  /**
   * The number of nearest neighbors to calculate.
   */
  k: number;
  /**
   * The geometry collection to calculate the nearest neighbors for.
   */
  geomCollection: GeometryCollection;
}): Promise<number[][]> {
  const neighbors: number[][] = [];

  const wasmInstance = await initWASM();

  if (geomCollection) {
    const result = wasmInstance.getNearestNeighbors(geomCollection, k);
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
