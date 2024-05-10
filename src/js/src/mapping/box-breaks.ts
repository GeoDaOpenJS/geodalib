import {initWASM} from '../init';
import {vecDoubleToNumber} from '../utils';

async function boxBreaks(data: number[] | Float32Array, hingeFactor: number): Promise<number[]> {
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

  const result = wasm.boxBreaks(wasmData, wasmUndefs, hingeFactor);

  return vecDoubleToNumber(result);
}

/**
 * The implementation of box breaks with hinge = 1.5
 * The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function hinge15Breaks(data: number[] | Float32Array): Promise<number[]> {
  const hingeFactor = 1.5;
  const result = await boxBreaks(data, hingeFactor);
  return result;
}

/**
 * The implementation of box breaks with hinge = 3.0
 * The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function hinge30Breaks(data: number[] | Float32Array): Promise<number[]> {
  const hingeFactor = 3.0;
  const result = await boxBreaks(data, hingeFactor);
  return result;
}