// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';
import { isValidNumber } from '../utils/validation';

/**
 * Adjusts the range of data to [0, 1] by subtracting the minimum value
 * and dividing by the range (max - min).
 *
 * @example
 * ```ts
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const adjusted = await rangeAdjust(data);
 * console.log(adjusted);
 * ```
 *
 * @param data The numeric values to be range adjusted
 * @returns The range adjusted data scaled to [0, 1]
 */
export async function rangeAdjust(data: number[] | Float32Array): Promise<number[]> {
  const wasm = await initWASM();

  const n = data.length;

  // Handle empty array
  if (n === 0) {
    return [];
  }

  const wasmUndefs = new wasm.VectorUInt();
  wasmUndefs.resize(n, 0);

  const wasmData = new wasm.VectorDouble();
  wasmData.resize(n, 0);

  let validCount = 0;
  for (let i = 0; i < n; ++i) {
    if (!isValidNumber(data[i])) {
      wasmUndefs.set(i, 1);
      wasmData.set(i, 0);
    } else {
      wasmData.set(i, data[i]);
      validCount++;
    }
  }

  // If no valid values, return original array unchanged
  if (validCount === 0) {
    return Array.from(data);
  }

  const result = wasm.rangeAdjust(wasmData, wasmUndefs);
  const resultArray = vecDoubleToNumber(result);

  // assign invalid result to original value
  for (let i = 0; i < n; ++i) {
    if (wasmUndefs.get(i) === 1) {
      resultArray[i] = data[i];
    }
  }

  return resultArray;
}
