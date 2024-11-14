import {initWASM} from '../init';
import {vecDoubleToNumber, vecIntToNumber, vecStringToArray} from '../utils';

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

export type LocalMoranProps = {
  data: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

// Get local moran statistics
export async function localMoran({
  data,
  neighbors,
  permutation,
  significanceCutoff = 0.05,
  seed = 1234567890
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
    colors: vecStringToArray(result.getColors())
  };
}

export type BivariateLocalMoranProps = {
  data1: number[] | Float32Array;
  data2: number[] | Float32Array;
  neighbors: number[][];
  permutation: number;
  significanceCutoff?: number;
  seed?: number;
};

// Get bivariate local moran statistics
export async function bivariateLocalMoran({
  data1,
  data2,
  neighbors,
  permutation,
  significanceCutoff = 0.05,
  seed = 1234567890
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
    colors: vecStringToArray(result.getColors())
  };
}
