// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';

/**
 * ## Description
 * The natural breaks (Jenks) algorithm breaks up the data into k classes by minimizing within-class variance
 * and maximizing between-class variance. The values in each group are as similar as possible to each other,
 * and as different as possible from the values in the other groups.
 *
 * ## Characteristics
 * - Based on natural groupings inherent in the data
 * - Similar values are grouped together
 * - Boundaries are set where there are relatively big jumps in data values
 * - Best for data with clear "breaks" in distribution
 *
 * @example
 * ```ts
 * import { naturalBreaks } from '@geoda/core';
 *
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const k = 3;
 * const breaks = await naturalBreaks(k, data);
 *
 * // breaks = [4, 7]
 * ```
 *
 * @param {number} k - The number of classes/categories
 * @param {(number[]|Float32Array)} data - The numeric values to be classified
 * @returns {Promise<number[]>} The breaks values
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
