import {LocalMoranResult} from './local-moran';
import {initWASM} from '../init';
import {vecDoubleToNumber, vecIntToNumber, vecStringToArray} from '../utils';

export type LocalGearyProps = {
  data: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

// Get local geary statistics
export async function localGeary({
  data,
  neighbors,
  permutation,
  significanceCutoff = 0.05,
  seed = 1234567890
}: LocalGearyProps): Promise<LocalMoranResult> {
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

  const result = wasm.localGeary(
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

export type MultivariateLocalGearyProps = {
  data: number[][];
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

// Get multivariate local geary statistics
export async function multivariateLocalGeary({
  data,
  neighbors,
  permutation,
  significanceCutoff = 0.05,
  seed = 1234567890
}: MultivariateLocalGearyProps): Promise<LocalMoranResult> {
  const wasm = await initWASM();

  const n = neighbors.length;
  const wasmData = new wasm.VecVecDouble();
  for (let i = 0; i < data.length; ++i) {
    const vals = new wasm.VectorDouble();
    for (let j = 0; j < data[i].length; ++j) {
      vals.push_back(data[i][j]);
    }
    wasmData.push_back(vals);
  }

  const wasmNeighbors = new wasm.VecVecUInt();
  const wasmUndefs = new wasm.VecVecUInt();

  for (let i = 0; i < n; ++i) {
    const nbrs = neighbors[i];
    const wasmNeighborIndices = new wasm.VectorUInt();
    for (let j = 0, numNbrs = nbrs.length; j < numNbrs; ++j) {
      wasmNeighborIndices.push_back(nbrs[j]);
    }
    wasmNeighbors.push_back(wasmNeighborIndices);
  }

  const result = wasm.multivariateLocalGeary(
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
