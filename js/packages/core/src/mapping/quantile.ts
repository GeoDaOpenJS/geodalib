// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';

/**
 * ## Description
 *
 * Creates classes with equal number of observations by:
 * - Sorting values in ascending order
 * - Dividing sorted values into bins with equal number of observations
 *
 * ## Characteristics
 * - Well-suited for ordinal data
 * - May place similar values in different classes
 * - Useful for comparing relative rankings across different areas
 *
 * @example
 * ```ts
 * import { quantileBreaks } from '@geoda/core';
 *
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const k = 3;
 * const breaks = await quantileBreaks(k, data);
 * // breaks = [3.5, 6.5]
 * ```
 *
 * @param k The number of classes/categories
 * @param data The numeric values to be classified
 * @returns The breaks values
 */
export async function quantileBreaks(k: number, data: number[] | Float32Array): Promise<number[]> {
  const wasm = await initWASM();

  const n = data.length;

  const wasmUndefs = new wasm.VectorUInt();
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
