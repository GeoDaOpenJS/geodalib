import {initWASM} from '../init';
import {vecDoubleToNumber} from '../utils';

/**
 * ## Description
 * Divides the range of values into equal-sized intervals.
 * 
 * ## Characteristics
 * - Simple to understand and interpret
 * - Best for evenly distributed data
 * - May not represent data well when distribution is skewed
 * - Interval size = (maximum value - minimum value) / number of classes
 * 
 * @example
 * ```ts
 * import { equalIntervalBreaks } from 'geoda-wasm';
 * 
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const k = 3;
 * const breaks = await equalIntervalBreaks(k, data);
 * 
 * // breaks = [3.66666666666667, 6.33333333333333]
 * ```
 * 
 * @param k The number of classes/categories
 * @param data The numeric values to be classified
 * @returns The breaks values
 */
export async function equalIntervalBreaks(
  k: number,
  data: number[] | Float32Array
): Promise<number[]> {
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

  const result = wasm.equalIntervalBreaks(k, wasmData, wasmUndefs);

  return vecDoubleToNumber(result);
}
