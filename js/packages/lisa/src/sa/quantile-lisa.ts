import {LocalMoranResult} from './local-moran';
import {initWASM} from '../init';
import {vecDoubleToNumber, vecIntToNumber, vecStringToArray} from '@geoda/common';

export type QuantileLisaProps = {
  k: number;
  quantile: number;
  data: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

/**
 * Get local Quantile Lisa statistics
 * @param k The number of classes/categories
 * @param quantile The quantile value
 * @param data The numeric values to be classified.
 * @param neighbors The neighbors of each observation
 * @param permutation The number of permutations
 * @param significanceCutoff The significance cutoff
 * @param seed The seed value
 * @returns LISA result
 */
export async function quantileLisa({
  k,
  quantile,
  data,
  neighbors,
  permutation,
  significanceCutoff = 0.05,
  seed = 1234567890
}: QuantileLisaProps): Promise<LocalMoranResult> {
  const wasm = await initWASM();

  const n = data.length;
  const wasmData = new wasm.VectorDouble();
  wasmData.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData.set(i, Number(data[i]));
  }

  const wasmUndefs = new wasm.VectorUInt();
  const wasmNeighbors = new wasm.VecVecUInt();
  for (let i = 0; i < n; ++i) {
    const nbrs = neighbors[i] ?? [];
    const wasmNeighborIndices = new wasm.VectorUInt();
    for (let j = 0, numNbrs = nbrs.length; j < numNbrs; ++j) {
      wasmNeighborIndices.push_back(nbrs[j]);
    }
    wasmNeighbors.push_back(wasmNeighborIndices);
  }

  const result = wasm.quantileLisa(
    k,
    quantile,
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
    colors: vecStringToArray(result.getColors())
  };
}
