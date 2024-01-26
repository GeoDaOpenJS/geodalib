import {BinaryFeatureCollection} from '@loaders.gl/schema';
import {Feature} from 'geojson';

import {
  BinaryGeometryType,
  getGeometryCollectionFromBinaryGeometries
} from '../features/binary-geometry';
import {getGeometryCollection} from '../features/geometry';
import {getWASM, initWASM} from '../init';

/**
 * Type of Nearest Neighbors input arguments.
 */
type NearestNeighborsInput = {
  k: number;
  geometries?: Feature[];
  latLngArrays?: {
    longitudes: Float64Array;
    latitudes: Float64Array;
  };
};

/**
 * Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.
 * @param {NearestNeighborsInput} input - The input parameters.
 * @returns {Promise<number[][]>} - The nearest neighbors as an array of indices.
 */
export async function getNearestNeighbors({
  k,
  geometries,
  latLngArrays
}: NearestNeighborsInput): Promise<number[][]> {
  const n = geometries ? geometries.length : latLngArrays ? latLngArrays.latitudes.length : 0;
  const neighbors: number[][] = Array(n);

  if (n === 0) {
    return neighbors;
  }

  const wasmInstance = await initWASM();
  const geomCollection = getGeometryCollection(
    {
      features: geometries ?? null,
      latitudes: latLngArrays?.latitudes ?? null,
      longitudes: latLngArrays?.longitudes ?? null
    },
    wasmInstance
  );

  if (geomCollection) {
    const result = wasmInstance.getNearestNeighbors(geomCollection, k);
    for (let i = 0; i < n; ++i) {
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
  binaryGeometries
}: NearestNeighborsFromBinaryGeometriesProps): Promise<number[][]> {
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
