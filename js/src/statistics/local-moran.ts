import {VectorDouble} from '../../wasm';
import {initWASM} from '../init';

export type LocalMoranResultType = {
  isValid: boolean;
  clusters: number[];
  lagValues: number[];
  pValues: number[];
  lisaValues: number[];
};

// Get local moran statistics
export async function localMoran(
  data: number[] | Float32Array,
  neighbors: number[][],
  permutation: number
): Promise<LocalMoranResultType> {
  const wasm = await initWASM();

  const n = data.length;
  const wasmData = new wasm.VectorDouble();
  wasmData.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData.set(i, data[i]);
  }

  const wasmNeighbors = new wasm.VecVecUInt();
  for (let i = 0; i < n; ++i) {
    const nbrs = neighbors[i];
    const wasmNeighborIndices = new wasm.VectorUInt();
    for (let j = 0, numNbrs = nbrs.length; j < numNbrs; ++j) {
      wasmNeighborIndices.push_back(nbrs[j]);
    }
    wasmNeighbors.push_back(wasmNeighborIndices);
  }

  const result = wasm.localMoran(wasmData, wasmNeighbors, permutation);

  return {
    isValid: result.isValid(),
    clusters: vecDoubleToNumber(result.getClusters()),
    lagValues: vecDoubleToNumber(result.getLagValues()),
    lisaValues: vecDoubleToNumber(result.getLisaValues()),
    pValues: vecDoubleToNumber(result.getPValues())
  };
}

export function vecDoubleToNumber(data: VectorDouble): number[] {
  const result: number[] = [];

  const n = data.size();
  for (let i = 0; i < n; ++i) {
    result.push(data.get(i));
  }

  return result;
}
