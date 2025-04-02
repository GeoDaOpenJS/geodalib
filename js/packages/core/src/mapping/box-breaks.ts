import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';

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
 * ## Description
 * Hinge Box Breaks calculates a list of breakpoints, including the top, bottom, median, and two quartiles of the data, with hinge value 1.5.
 * The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier
 *
 * ## Characteristics
 * - Fixed categories
 * - Effective for detecting spatial outliers and understanding data distribution
 *
 * @example
 * ```ts
 * import { hinge15Breaks } from '@geoda/core';
 *
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const breaks = await hinge15Breaks(data);
 *
 * // breaks1 = [-4, 2.75, 5, 7.25, 14]
 * ```
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
 * ## Description
 * Hinge Box Breaks calculates a list of breakpoints, including the top, bottom, median, and two quartiles of the data, with hinge value 1.5.
 * The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier
 *
 * ## Characteristics
 * - Fixed categories
 * - Effective for detecting spatial outliers and understanding data distribution
 *
 * @example
 * ```ts
 * import { hinge15Breaks } from '@geoda/core';
 *
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const breaks = await hinge15Breaks(data);
 *
 * // breaks2 = [-10.75, 2.75, 5, 7.25, 20.75]
 * ```
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function hinge30Breaks(data: number[] | Float32Array): Promise<number[]> {
  const hingeFactor = 3.0;
  const result = await boxBreaks(data, hingeFactor);
  return result;
}
