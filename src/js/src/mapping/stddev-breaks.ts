import {initWASM} from '../init';
import {vecDoubleToNumber} from '../utils';

/**
 * The standard deviation breaks implementation.
 * The standard deviation breaks include: < -2 std dev, [-2, -1) std dev, [-1, 0) std dev, [0, 1] std dev, (1, 2] std dev, > 2 std dev
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
