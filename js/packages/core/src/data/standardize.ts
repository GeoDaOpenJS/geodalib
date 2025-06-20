import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';
import { isValidNumber } from '../utils/validation';

/**
 * Standardizes data using z-score normalization.
 * For each valid data point, applies the transformation: (x - mean) / stddev
 *
 * @example
 * ```ts
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const standardized = await standardize(data);
 * console.log(standardized);
 * ```
 *
 * @param data The numeric values to be standardized
 * @returns The standardized data using z-score normalization
 */
export async function standardize(data: number[] | Float32Array): Promise<number[]> {
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

  const result = wasm.standardize(wasmData, wasmUndefs);
  const resultArray = vecDoubleToNumber(result);

  // assign invalid result to original value
  for (let i = 0; i < n; ++i) {
    if (wasmUndefs.get(i) === 1) {
      resultArray[i] = data[i];
    }
  }

  return resultArray;
}
