// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';
import { isValidNumber } from '../utils/validation';

/**
 * Standardizes data using Mean Absolute Deviation (MAD) normalization.
 *
 * For each valid data point, applies the transformation: (x - mean) / mad
 *
 * @example
 * ```ts
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const standardized = await standardizeMAD(data);
 * console.log(standardized);
 * ```
 * @param data The numeric values to be standardized
 * @returns The standardized data using MAD normalization
 */
export async function standardizeMAD(data: number[] | Float32Array): Promise<number[]> {
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

  // If only one valid value, MAD would be 0, so return original array unchanged
  if (validCount === 1) {
    return Array.from(data);
  }

  const result = wasm.standardizeMAD(wasmData, wasmUndefs);
  const resultArray = vecDoubleToNumber(result);

  // assign invalid result to original value
  for (let i = 0; i < n; ++i) {
    if (wasmUndefs.get(i) === 1) {
      resultArray[i] = data[i];
    }
  }

  return resultArray;
}
