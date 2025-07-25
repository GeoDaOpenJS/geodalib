// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { LinearRegressionProps, printNumber, printVariableCoefficients } from './linear-regression';
import { initWASM } from '../init';

export type SpatialErrorResult = {
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
  'Lag coefficient (Lambda)': number;
  'R-squared': number;
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
    'BREUSCH-PAGAN TEST': {
      Test: string;
      'Breusch-Pagan DF': number;
      'Breusch-Pagan Value': number;
      'Breusch-Pagan Probability': number;
    };
  };
  'DIAGNOSTICS FOR SPATIAL DEPENDENCE': {
    'LIKELIHOOD RATIO TEST': {
      Test: string;
      'Likelihood Ratio DF': number;
      'Likelihood Ratio Value': number;
      'Likelihood Ratio Probability': number;
    };
  };
};

/**
 * Perform a spatial error regression analysis using maximum likelihood estimation.
 *
 * ## Example
 * ```typescript
 * import { spatialErrorRegression } from '@geodash/regression';
 *
 * // two independent variables, one dependent variable, and weights
 * // three observations
 * const weights = [[1], [0, 2], [0]];
 * const weightsValues = [1.0, 1.0, 1.0];
 *
 * const result = await spatialErrorRegression({
 *   x: [[1, 2, 3], [4, 5, 6]],
 *   y: [1, 2, 3],
 *   weightsId: 'weights',
 *   weights,
 *   weightsValues,
 *   xNames: ['x1', 'x2'],
 *   yName: 'y',
 *   datasetName: 'dataset',
 * });
 * ```
 *
 * @param props - The properties for the spatial error regression.
 * @param props.x - The independent variables.
 * @param props.y - The dependent variable.
 * @param props.weightsId - The id of the weights.
 * @param props.weights - The weights.
 * @param props.weightsValues - The values of the weights.
 * @param props.xNames - The names of the independent variables.
 * @param props.yName - The name of the dependent variable.
 * @param props.datasetName - The name of the dataset.
 * @param props.xUndefs - The undefined values of the independent variables.
 * @param props.yUndefs - The undefined values of the dependent variable.
 * @returns The result of the spatial error regression.
 */
// eslint-disable-next-line max-statements, complexity
export async function spatialError({
  x,
  y,
  weightsId,
  weights,
  weightsValues,
  xNames,
  yName,
  datasetName,
  xUndefs,
  yUndefs,
}: LinearRegressionProps): Promise<SpatialErrorResult> {
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
  // 2 is added to xNames.length to account for the constant and lambda
  for (let i = 0; i < xNames.length + 2; ++i) {
    coefficients.push({
      Variable: regReport.GetXVarName(i),
      Coefficient: regReport.GetCoefficient(i),
      'Std Error': regReport.GetStdError(i),
      't-Statistic': regReport.GetZValue(i),
      Probability: regReport.GetProbability(i),
    });
  }

  const result = {
    type: 'spatialError',
    dependentVariable: yName,
    independentVariables: xNames,
    title: 'SPATIAL LAG MODEL - MAXIMUM LIKELIHOOD ESTIMATION',
    datasetName,
    weightsId,
    'Number of Observations': regReport.GetNoObservation(),
    'Mean Dependent Var': regReport.GetMeanY(),
    'Number of Variables': xNames.length + 1,
    'SD Dependent Var': regReport.GetSDevY(),
    'Degrees of Freedom': regReport.GetNoObservation() - xNames.length,
    'Lag coefficient (Lambda)': regReport.GetCoefficient(xNames.length + 1),
    'R-squared': regReport.GetR2(),
    'Log Likelihood': regReport.GetLIK(),
    'Akaike Info Criterion': regReport.GetAIC(),
    'Sigma-Square': regReport.GetSIQ_SQ(),
    'Schwarz Criterion': regReport.GetOLS_SC(),
    'SE of Regression': Math.sqrt(regReport.GetSIQ_SQ()),
    'Variable Coefficients': coefficients,
    'DIAGNOSTICS FOR HETEROSKEDASTICITY': {
      'BREUSCH-PAGAN TEST': {
        Test: 'Breusch-Pagan test',
        'Breusch-Pagan DF': regReport.GetBPtest(0),
        'Breusch-Pagan Value': regReport.GetBPtest(1),
        'Breusch-Pagan Probability': regReport.GetBPtest(2),
      },
    },
    'DIAGNOSTICS FOR SPATIAL DEPENDENCE': {
      'LIKELIHOOD RATIO TEST': {
        Test: 'Likelihood Ratio Test',
        'Likelihood Ratio DF': regReport.GetLRTestValue(0),
        'Likelihood Ratio Value': regReport.GetLRTestValue(1),
        'Likelihood Ratio Probability': regReport.GetLRTestValue(2),
      },
    },
  };

  return result;
}

// eslint-disable-next-line max-statements
export function printSpatialErrorResultUsingMarkdown(report: SpatialErrorResult): string {
  let output = '';

  // printSummary
  output += `Dataset: ${report.datasetName}\n`;
  output += `${report.weightsId ? `Weights: ${report.weightsId}\n` : ''}`;
  output += '|  |  |  |  |\n';
  output += '|---|---|---|---|\n';
  output += `|Dependent Variable |${report.dependentVariable}| No. Observations |${printNumber(
    report['Number of Observations']
  )}|\n`;
  output += `|Mean Dependent Var | ${printNumber(
    report['Mean Dependent Var']
  )}| Number of Variables | ${report['Number of Variables']} |\n`;
  output += `|S.D. dependent var| ${printNumber(
    report['SD Dependent Var']
  )}| Degrees of Freedom | ${report['Degrees of Freedom']} |\n`;

  // printMoreSummary
  output += `|Lag coefficient (Lambda) | ${printNumber(report['Lag coefficient (Lambda)'])} |||\n`;

  output += `&nbsp;  \n`;
  output += '|  |  |  |  |\n';
  output += `|R-squared | ${printNumber(report['R-squared'])} | Log Likelihood | ${printNumber(
    report['Log Likelihood']
  )} |\n`;
  output += `|Sq. Correlation|-|Akaike Info Criterion|${printNumber(
    report['Akaike Info Criterion']
  )}|\n`;
  output += `|Sigma-Square|${printNumber(
    report['Sigma-Square']
  )}| Schwarz Criterion | ${printNumber(report['Schwarz Criterion'])} |\n`;
  output += `|SE of Regression|${printNumber(report['SE of Regression'])}|||\n`;

  // printVariableCoefficients
  output += `&nbsp;  \n`;
  output += printVariableCoefficients(report);

  // printRegressionDiagnostics
  output += `&nbsp;  \n`;
  output += `&nbsp;  \n`;
  output += 'REGRESSION DIAGNOSTICS\n';
  output += 'DIAGNOSTICS FOR HETEROSKEDASTICITY\n';
  output += 'RANDOM COEFFICIENTS\n';
  output += `| Test | DF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Probability|\n`;
  output += `|------|----|-------|------------|\n`;
  const bpTest = report['DIAGNOSTICS FOR HETEROSKEDASTICITY']['BREUSCH-PAGAN TEST'];
  output += `|${bpTest.Test}| ${printNumber(bpTest['Breusch-Pagan DF'])} | ${printNumber(
    bpTest['Breusch-Pagan Value']
  )} | ${printNumber(bpTest['Breusch-Pagan Probability'])}|\n`;

  // printDiagnosticsForSpatialDependence
  output += `&nbsp;  \n`;
  output += `&nbsp;  \n`;
  output += 'DIAGNOSTICS FOR SPATIAL DEPENDENCE\n';
  output += 'SPATIAL ERROR DEPENDENCE FOR WEIGHT MATRIX\n';

  output += `| Test | DF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Probability|\n`;
  output += `|------|----|-------|------------|\n`;

  const likelihood = report['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['LIKELIHOOD RATIO TEST'];
  output += `|${likelihood.Test}| ${printNumber(likelihood['Likelihood Ratio DF'])} | ${printNumber(
    likelihood['Likelihood Ratio Value']
  )} | ${printNumber(likelihood['Likelihood Ratio Probability'])}|\n`;

  return output;
}
