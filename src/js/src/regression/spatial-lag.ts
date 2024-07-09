import {LinearRegressionProps} from './linear-regression';
import {initWASM} from '../init';

export type SpatialLagResult = {
  type: string;
  dependentVariable: string;
  independentVariables: string[];
  title: string;
  datasetName: string;
  weightsId?: string;
  'Number of Observations': number;
  'Mean Dependent Var': number;
  'Number of Variables': number;
  'SD Dependent Var': number;
  'Degrees of Freedom': number;
  'Lag coefficient (Rho)': number;
  'Log Likelihood': number;
  'Akaike Info Criterion': number;
  'Sigma-Square': number;
  'Schwarz Criterion': number;
  'SE of Regression': number;
  'Variable Coefficients': Array<{
    Variable: string;
    Coefficient: number;
    'Std Error': number;
    't-Statistic': number;
    Probability: number;
  }>;
  'DIAGNOSTICS FOR HETEROSKEDASTICITY': {
    'RANDOM COEFFICIENTS': {
      Test: string;
      'Breusch-Pagan DF': number;
      'Breusch-Pagan Value': number;
      'Breusch-Pagan Probability': number;
    };
  };
  'DIAGNOSTICS FOR SPATIAL DEPENDENCE': {
    'SPATIAL LAG DEPENDENCE FOR WEIGHT MATRIX': {
      Test: string;
      'Likelihood Ratio DF': number;
      'Likelihood Ratio Value': number;
      'Likelihood Ratio Probability': number;
    };
  };
};

// eslint-disable-next-line max-statements, complexity
export async function spatialLag({
  x,
  y,
  weightsId,
  weights,
  weightsValues,
  xNames,
  yName,
  datasetName,
  xUndefs,
  yUndefs
}: LinearRegressionProps): Promise<SpatialLagResult> {
  const wasmInstance = await initWASM();
  // Create a new vector of doubles
  const wasmY = new wasmInstance.VectorDouble();
  for (let i = 0; i < y.length; ++i) {
    wasmY.push_back(y[i]);
  }
  // Create a new VecVecDouble for x
  const wasmX = new wasmInstance.VecVecDouble();
  for (let i = 0; i < x.length; ++i) {
    const vals = new wasmInstance.VectorDouble();
    for (let j = 0; j < x[i].length; ++j) {
      vals.push_back(x[i][j]);
    }
    wasmX.push_back(vals);
  }
  // Create a new VecVecUInt for weights
  const wasmWeights = new wasmInstance.VecVecUInt();
  if (weights) {
    for (let i = 0; i < weights.length; ++i) {
      const vals = new wasmInstance.VectorUInt();
      for (let j = 0; j < weights[i].length; ++j) {
        vals.push_back(weights[i][j]);
      }
      wasmWeights.push_back(vals);
    }
  }

  // Create a new VecVecDouble for weightsValues
  const wasmWeightsValues = new wasmInstance.VecVecDouble();
  if (weightsValues) {
    for (let i = 0; i < weightsValues.length; ++i) {
      const vals = new wasmInstance.VectorDouble();
      for (let j = 0; j < weightsValues[i].length; ++j) {
        vals.push_back(weightsValues[i][j]);
      }
      wasmWeightsValues.push_back(vals);
    }
  }

  // Create a new vector of strings for xNames
  const wasmXNames = new wasmInstance.VectorString();
  for (let i = 0; i < xNames.length; ++i) {
    wasmXNames.push_back(xNames[i]);
  }
  // Create a new VectorInt for yUndefs
  const wasmYUndefs = new wasmInstance.VectorUInt();
  if (yUndefs) {
    for (let i = 0; i < yUndefs.length; ++i) {
      wasmYUndefs.push_back(yUndefs[i]);
    }
  }
  // Create a new VecVecInt for xUndefs
  const wasmXUndefs = new wasmInstance.VecVecUInt();
  if (xUndefs) {
    for (let i = 0; i < xUndefs.length; ++i) {
      const vals = new wasmInstance.VectorUInt();
      for (let j = 0; j < xUndefs[i].length; ++j) {
        vals.push_back(xUndefs[i][j]);
      }
      wasmXUndefs.push_back(vals);
    }
  }

  const regReport = wasmInstance.spatialLag(
    wasmY,
    wasmX,
    wasmWeights,
    wasmWeightsValues,
    yName,
    wasmXNames,
    datasetName,
    wasmYUndefs,
    wasmXUndefs
  );

  const coefficients = [];
  // 2 is added to xNames.length to account for the constant and the spatial lag of Y (W_Y)
  for (let i = 0; i < xNames.length + 2; ++i) {
    coefficients.push({
      Variable: regReport.GetXVarName(i),
      Coefficient: regReport.GetCoefficient(i),
      'Std Error': regReport.GetStdError(i),
      't-Statistic': regReport.GetZValue(i),
      Probability: regReport.GetProbability(i)
    });
  }

  const result = {
    type: 'spatialLag',
    dependentVariable: yName,
    independentVariables: xNames,
    title: 'SPATIAL LAG MODEL - MAXIMUM LIKELIHOOD ESTIMATION',
    datasetName,
    weightsId,
    'Number of Observations': regReport.GetNoObservation(),
    'Mean Dependent Var': regReport.GetMeanY(),
    'Number of Variables': xNames.length + 1,
    'SD Dependent Var': regReport.GetSDevY(),
    'Degrees of Freedom': regReport.GetNoObservation() - xNames.length - 1,
    'Lag coefficient (Rho)': regReport.GetCoefficient(0),
    'R-squared': regReport.GetR2(),
    'Log Likelihood': regReport.GetLIK(),
    'Akaike Info Criterion': regReport.GetAIC(),
    'Sigma-Square': regReport.GetSIQ_SQ(),
    'Schwarz Criterion': regReport.GetOLS_SC(),
    'SE of Regression': Math.sqrt(regReport.GetSIQ_SQ()),
    'Variable Coefficients': coefficients,
    'DIAGNOSTICS FOR HETEROSKEDASTICITY': {
      'RANDOM COEFFICIENTS': {
        Test: 'Breusch-Pagan test',
        'Breusch-Pagan DF': regReport.GetBPtest(0),
        'Breusch-Pagan Value': regReport.GetBPtest(1),
        'Breusch-Pagan Probability': regReport.GetBPtest(2)
      }
    },
    'DIAGNOSTICS FOR SPATIAL DEPENDENCE': {
      'SPATIAL LAG DEPENDENCE FOR WEIGHT MATRIX': {
        Test: 'Likelihood Ratio Test',
        'Likelihood Ratio DF': regReport.GetLRTestValue(0),
        'Likelihood Ratio Value': regReport.GetLRTestValue(1),
        'Likelihood Ratio Probability': regReport.GetLRTestValue(2)
      }
    }
  };

  return result;
}
