import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';

/**
 * ## Description
 * Percentile Breaks divides the data into six ranges: the lowest 1%, 1-10%, 10-50%, 50-90%, 90-99% and the top 1%.
 *
 * ## Characteristics
 * - Fixed categories
 * - Effective for identifying spatial outliers and extreme values
 *
 * @example
 * ```ts
 * import { percentileBreaks } from 'geoda-wasm';
 *
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const breaks = await percentileBreaks(data);
 *
 * // breaks = [1, 1.4, 5, 8.6, 9]
 * ```
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function percentileBreaks(data: number[] | Float32Array): Promise<number[]> {
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

  const result = wasm.percentileBreaks(wasmData, wasmUndefs);

  return vecDoubleToNumber(result);
}
