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

export type LinearRegressionProps = {
  x: number[][];
  y: number[];
  weights?: number[][];
  xNames: string[];
  yName: string;
  datasetName: string;
  xUndefs?: number[][];
  yUndefs?: number[];
};

// eslint-disable-next-line max-statements, complexity
export async function linearRegression({
  x,
  y,
  weights,
  xNames,
  yName,
  datasetName,
  xUndefs,
  yUndefs
}: LinearRegressionProps): Promise<string> {
  const wasmInstance = await initWASM();
  // Create a new vector of doubles
  const wasmY = new wasmInstance.VectorDouble();
  wasmY.resize(y.length, 0);
  for (let i = 0; i < y.length; ++i) {
    wasmY.set(i, y[i]);
  }
  // Create a new VecVecDouble for x
  const wasmX = new wasmInstance.VecVecDouble();
  wasmX.resize(x.length, new wasmInstance.VectorDouble());
  for (let i = 0; i < x.length; ++i) {
    wasmX.get(i).resize(x[i].length, 0);
    for (let j = 0; j < x[i].length; ++j) {
      wasmX.get(i).set(j, x[i][j]);
    }
  }
  // Create a new VecVecUInt for weights
  const wasmWeights = new wasmInstance.VecVecUInt();
  if (weights) {
    wasmWeights.resize(weights.length, new wasmInstance.VectorUInt());
    for (let i = 0; i < weights.length; ++i) {
      wasmWeights.get(i).resize(weights[i].length, 0);
      for (let j = 0; j < weights[i].length; ++j) {
        wasmWeights.get(i).set(j, weights[i][j]);
      }
    }
  }
  // Create a new vector of strings for xNames
  const wasmXNames = new wasmInstance.VectorString();
  wasmXNames.resize(xNames.length, '');
  for (let i = 0; i < xNames.length; ++i) {
    wasmXNames.set(i, xNames[i]);
  }
  // Create a new VectorInt for yUndefs
  const wasmYUndefs = new wasmInstance.VectorInt();
  if (yUndefs) {
    wasmYUndefs.resize(yUndefs.length, 0);
    for (let i = 0; i < yUndefs.length; ++i) {
      wasmYUndefs.set(i, yUndefs[i]);
    }
  }
  // Create a new VecVecInt for xUndefs
  const wasmXUndefs = new wasmInstance.VecVecInt();
  if (xUndefs) {
    wasmXUndefs.resize(xUndefs.length, new wasmInstance.VectorInt());
    for (let i = 0; i < xUndefs.length; ++i) {
      wasmXUndefs.get(i).resize(xUndefs[i].length, 0);
      for (let j = 0; j < xUndefs[i].length; ++j) {
        wasmXUndefs.get(i).set(j, xUndefs[i][j]);
      }
    }
  }

  const result = wasmInstance.linearRegression(
    wasmY,
    wasmX,
    wasmWeights,
    yName,
    wasmXNames,
    datasetName,
    wasmYUndefs,
    wasmXUndefs
  );

  return result;
}
