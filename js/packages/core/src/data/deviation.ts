import { initWASM } from '../init';
import { vecDoubleToNumber } from '@geoda/common';
import { isValidNumber } from '../utils/validation';

/**
 * Calculate the deviation from the mean.
 *
 * Note: The deviation from the mean is the difference between the mean and the data point.
 *
 * @param data - The data to calculate the deviation from the mean
 * @returns The deviation from the mean
 *
 * @example
 * ```ts
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const deviation = await deviationFromMean(data);
 * console.log(deviation);
 * ```
 */
export async function deviationFromMean(data: number[] | Float32Array): Promise<number[]> {
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

  const result = wasm.deviationFromMean(wasmData, wasmUndefs);
  const resultArray = vecDoubleToNumber(result);

  // assign invalid result to original value
  for (let i = 0; i < n; ++i) {
    if (wasmUndefs.get(i) === 1) {
      resultArray[i] = data[i];
    }
  }

  return resultArray;
}
