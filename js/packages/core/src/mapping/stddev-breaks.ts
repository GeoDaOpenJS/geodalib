import {initWASM} from '../init';
import {vecDoubleToNumber} from '@geoda/common';

/**
 * ## Description
 * The standard deviation breaks classes based on distance from the mean in standard deviation units.
 * The standard deviation breaks include: < -2 std dev, [-2, -1) std dev, [-1, 0) std dev, [0, 1] std dev, (1, 2] std dev, > 2 std dev
 *
 * ## Characteristics
 * - Centers on the mean value
 * - Classes represent standard deviation intervals
 * - Most appropriate for normally distributed data
 * - Helps identify areas that deviate significantly from the mean
 *
 * @example
 * ```ts
 * import { standardDeviationBreaks } from 'geoda-wasm';
 *
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const breaks = await standardDeviationBreaks(data);
 *
 * // breaks = [-0.47722557505166, 2.26138721247417, 5, 7.73861278752583, 10.47722557505166]
 * ```
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function standardDeviationBreaks(data: number[] | Float32Array): Promise<number[]> {
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

  const result = wasm.standardDeviationBreaks(wasmData, wasmUndefs);

  return vecDoubleToNumber(result);
}
