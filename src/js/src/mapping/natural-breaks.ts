import {initWASM} from '../init';
import {vecDoubleToNumber} from '../utils';

/**
 * The natural breaks (Jenks) algorithm to determine the best way to break up the data into k different groups.
 * The values in each group are as similar as possible to each other, and as different as possible from the values in the other groups.
 * @param k The number of classes/categories
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function naturalBreaks(k: number, data: number[] | Float32Array): Promise<number[]> {
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

  const result = wasm.naturalBreaks(k, wasmData, wasmUndefs);

  return vecDoubleToNumber(result);
}
