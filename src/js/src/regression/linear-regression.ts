import {initWASM} from '../init';

export async function runLinearRegression(): Promise<number> {
  const wasmInstance = await initWASM();
  const result = wasmInstance.dotProduct();
  return result;
}
