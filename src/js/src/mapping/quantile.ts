import {initWASM} from '../init';
import {vecDoubleToNumber} from '../utils';

/**
 * The quantile breaks algorithm to determine the best way to break up the data into k groups. Each group has the same number of observations.
 * @param k The number of classes/categories
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function quantileBreaks(k: number, data: number[] | Float32Array): Promise<number[]> {
  const wasm = await initWASM();

  const n = data.length;

  const wasmUndefs = new wasm.VectorInt();
  wasmUndefs.resize(n, 0);

  const wasmData = new wasm.VectorDouble();
  wasmData.resize(n, 0);
  for (let i = 0; i < n; ++i) {
    wasmData.set(i, data[i]);
    if (data[i] === undefined || data[i] === null) {
      wasmUndefs.set(i, 1);
    }
  }

  const result = wasm.quantileBreaks(k, wasmData, wasmUndefs);

  return vecDoubleToNumber(result);
}
