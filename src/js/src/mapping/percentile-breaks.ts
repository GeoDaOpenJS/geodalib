import {initWASM} from '../init';
import {vecDoubleToNumber} from '../utils';

/**
 * The percentile breaks implementation.
 * The percentile breaks include: <= 1%, (1-10]%, (10-50]%, (50-90)%, [90-99)%, >= 99%
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export async function percentileBreaks(data: number[] | Float32Array): Promise<number[]> {
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

  const result = wasm.percentileBreaks(wasmData, wasmUndefs);

  return vecDoubleToNumber(result);
}
