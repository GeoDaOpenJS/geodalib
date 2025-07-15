// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { initWASM } from '../init';
import { vecDoubleToNumber, vecIntToNumber, vecStringToArray } from '@geoda/common';

/**
 * Result object containing Local Moran's I statistics and cluster information
 *
 * @typedef {Object} LocalMoranResult
 * @property {boolean} isValid - Indicates if the analysis was successful
 * @property {number[]} clusters - Cluster assignments for each observation
 * @property {number[]} lagValues - Spatially lagged values
 * @property {number[]} pValues - Statistical significance values
 * @property {number[]} lisaValues - Local Moran's I statistics
 * @property {number[]} sigCategories - Significance categories (e.g., high-high, low-low)
 * @property {number[]} nn - Number of neighbors for each observation
 * @property {string[]} labels - Descriptive labels for clusters
 * @property {string[]} colors - Color codes for visualization
 */
export type LocalMoranResult = {
  isValid: boolean;
  clusters: number[];
  lagValues: number[];
  pValues: number[];
  lisaValues: number[];
  sigCategories: number[];
  nn: number[];
  labels: string[];
  colors: string[];
};

/**
 * Configuration properties for univariate Local Moran's I calculation
 * @typedef {Object} LocalMoranProps
 * @property {number[] | Float32Array} data - Input data array
 * @property {number[][]} neighbors - Spatial weights matrix as adjacency list
 * @property {number} permutation - Number of permutations for significance testing
 * @property {number} [significanceCutoff=0.05] - Statistical significance threshold
 * @property {number} [seed=1234567890] - Random seed for reproducibility
 */
export type LocalMoranProps = {
  data: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

/**
 * Calculates univariate Local Moran's I statistics for spatial autocorrelation
 *
 * ## Example
 * ```ts
 * import { localMoran } from '@geoda/lisa';
 *
 * const data = [1, 2, 3, 4, 5];
 * const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];
 *
 * const result = await localMoran({
 *   data,
 *   neighbors,
 * });
 *
 * console.log(result);
 * ```
 * @param {LocalMoranProps} props - Configuration object for Local Moran's I calculation
 * @returns {Promise<LocalMoranResult>} Promise resolving to Local Moran statistics and cluster assignments
 */
export async function localMoran({
  data,
  neighbors,
  permutation = 999,
  significanceCutoff = 0.05,
  seed = 1234567890,
}: LocalMoranProps): Promise<LocalMoranResult> {
  const wasm = await initWASM();

  const n = data.length;
  const wasmData = new wasm.VectorDouble();
  wasmData.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData.set(i, Number(data[i]));
  }

  const wasmNeighbors = new wasm.VecVecUInt();
  const wasmUndefs = new wasm.VectorUInt();

  for (let i = 0; i < n; ++i) {
    const nbrs = neighbors[i] ?? [];
    const wasmNeighborIndices = new wasm.VectorUInt();
    for (let j = 0, numNbrs = nbrs.length; j < numNbrs; ++j) {
      wasmNeighborIndices.push_back(nbrs[j]);
    }
    wasmNeighbors.push_back(wasmNeighborIndices);
  }

  const result = wasm.localMoran(
    wasmData,
    wasmNeighbors,
    wasmUndefs,
    significanceCutoff,
    permutation,
    seed
  );

  return {
    isValid: result.isValid(),
    clusters: vecDoubleToNumber(result.getClusters()),
    lagValues: vecDoubleToNumber(result.getLagValues()),
    lisaValues: vecDoubleToNumber(result.getLisaValues()),
    pValues: vecDoubleToNumber(result.getPValues()),
    sigCategories: vecIntToNumber(result.getSignificanceCategories()),
    nn: vecIntToNumber(result.getNN()),
    labels: vecStringToArray(result.getLabels()),
    colors: vecStringToArray(result.getColors()),
  };
}

/**
 * Configuration properties for bivariate Local Moran's I calculation
 * @typedef {Object} BivariateLocalMoranProps
 * @property {number[] | Float32Array} data1 - First variable's observations
 * @property {number[] | Float32Array} data2 - Second variable's observations
 * @property {number[][]} neighbors - Spatial weights matrix as adjacency list
 * @property {number} permutation - Number of permutations for significance testing
 * @property {number} [significanceCutoff=0.05] - Statistical significance threshold
 * @property {number} [seed=1234567890] - Random seed for reproducibility
 */
export type BivariateLocalMoranProps = {
  data1: number[] | Float32Array;
  data2: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

/**
 * Calculates bivariate Local Moran's I statistics to measure spatial correlation
 * between two variables
 *
 * ## Example
 * ```ts
 * import { bivariateLocalMoran } from '@geoda/lisa';
 *
 * const data1 = [1, 2, 3, 4, 5];
 * const data2 = [1, 2, 3, 4, 5];
 * const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];
 *
 * const result = await bivariateLocalMoran({
 *   data1,
 *   data2,
 *   neighbors,
 * });
 *
 * console.log(result);
 * ```
 *
 * @param {BivariateLocalMoranProps} props - Configuration object for bivariate Local Moran's I
 * @returns {Promise<LocalMoranResult>} Promise resolving to Local Moran statistics and cluster assignments
 */
export async function bivariateLocalMoran({
  data1,
  data2,
  neighbors,
  permutation = 999,
  significanceCutoff = 0.05,
  seed = 1234567890,
}: BivariateLocalMoranProps): Promise<LocalMoranResult> {
  const wasm = await initWASM();

  const n = data1.length;
  const wasmData1 = new wasm.VectorDouble();
  wasmData1.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData1.set(i, data1[i]);
  }
  const wasmData2 = new wasm.VectorDouble();
  wasmData2.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData2.set(i, data2[i]);
  }

  const wasmNeighbors = new wasm.VecVecUInt();
  const wasmUndefs = new wasm.VectorUInt();

  for (let i = 0; i < n; ++i) {
    const nbrs = neighbors[i];
    const wasmNeighborIndices = new wasm.VectorUInt();
    for (let j = 0, numNbrs = nbrs.length; j < numNbrs; ++j) {
      wasmNeighborIndices.push_back(nbrs[j]);
    }
    wasmNeighbors.push_back(wasmNeighborIndices);
  }

  const result = wasm.bivariateLocalMoran(
    wasmData1,
    wasmData2,
    wasmNeighbors,
    wasmUndefs,
    significanceCutoff,
    permutation,
    seed
  );

  return {
    isValid: result.isValid(),
    clusters: vecDoubleToNumber(result.getClusters()),
    lagValues: vecDoubleToNumber(result.getLagValues()),
    lisaValues: vecDoubleToNumber(result.getLisaValues()),
    pValues: vecDoubleToNumber(result.getPValues()),
    sigCategories: vecIntToNumber(result.getSignificanceCategories()),
    nn: vecIntToNumber(result.getNN()),
    labels: vecStringToArray(result.getLabels()),
    colors: vecStringToArray(result.getColors()),
  };
}
