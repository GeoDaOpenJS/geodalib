import {initWASM} from '../init';

export async function dotProduct(x: number[], y: number[]): Promise<number> {
  // check if x and y are of the same length
  if (x.length !== y.length) {
    throw new Error('x and y must be of the same length');
  }
  const wasmInstance = await initWASM();

  // Create a new vector of doubles
  const wasmX = new wasmInstance.VectorDouble();
  wasmX.resize(x.length, 0);
  for (let i = 0; i < x.length; ++i) {
    wasmX.set(i, x[i]);
  }
  const wasmY = new wasmInstance.VectorDouble();
  wasmY.resize(y.length, 0);
  for (let i = 0; i < y.length; ++i) {
    wasmY.set(i, y[i]);
  }
  const result = wasmInstance.dotProduct(wasmX, wasmY);
  return result;
}
