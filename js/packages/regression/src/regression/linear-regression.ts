import {initWASM} from '../init';
import {SpatialErrorResult} from './spatial-error';
import {SpatialLagResult} from './spatial-lag';

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
  weightsValues?: number[][];
  weightsId?: string;
  xNames: string[];
  yName: string;
  datasetName: string;
  xUndefs?: number[][];
  yUndefs?: number[];
};

export type LinearRegressionResult = {
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
  'R-squared': number;
  'Adjusted R-squared': number;
  'F-statistic': number;
  'Prob(F-statistic)': number;
  'Sum Squared Residual': number;
  'Log Likelihood': number;
  'Sigma-Square': number;
  'Akaike Info Criterion': number;
  'SE of Regression': number;
  'Schwarz Criterion': number;
  'Sigma-Square ML': number;
  'Variable Coefficients': Array<{
    Variable: string;
    Coefficient: number;
    'Std Error': number;
    't-Statistic': number;
    Probability: number;
  }>;
  'REGRESSION DIAGNOSTICS': {
    'MULTICOLLINEARITY CONDITION NUMBER': number;
    'TEST ON NORMALITY OF ERRORS': {
      Test: string;
      'Jarque-Bera DF': number;
      'Jarque-Bera Value': number;
      'Jarque-Bera Probability': number;
    };
  };
  'DIAGNOSTICS FOR HETEROSKEDASTICITY': {
    'BREUSCH-PAGAN TEST': {
      Test: string;
      'Breusch-Pagan DF': number;
      'Breusch-Pagan Value': number;
      'Breusch-Pagan Probability': number;
    };
    'KOENKER-Bassett TEST': {
      Test: string;
      'Koenker-Bassett DF': number;
      'Koenker-Bassett Value': number;
      'Koenker-Bassett Probability': number;
    };
  };
  'DIAGNOSTICS FOR SPATIAL DEPENDENCE': {
    "Moran's I (error)": {
      Test: string;
      "Moran's I (error)": number;
      'Moran’s I (error) Z': number;
      'Moran’s I (error) Probability': number;
    };
    'Lagrange Multiplier (lag)': {
      Test: string;
      'Lagrange Multiplier (lag) DF': number;
      'Lagrange Multiplier (lag) Value': number;
      'Lagrange Multiplier (lag) Probability': number;
    };
    'Robust LM (lag)': {
      Test: string;
      'Robust LM (lag) DF': number;
      'Robust LM (lag) Value': number;
      'Robust LM (lag) Probability': number;
    };
    'Lagrange Multiplier (error)': {
      Test: string;
      'Lagrange Multiplier (error) DF': number;
      'Lagrange Multiplier (error) Value': number;
      'Lagrange Multiplier (error) Probability': number;
    };
    'Robust LM (error)': {
      Test: string;
      'Robust LM (error) DF': number;
      'Robust LM (error) Value': number;
      'Robust LM (error) Probability': number;
    };
    'Lagrange Multiplier (SARMA)': {
      Test: string;
      'Lagrange Multiplier (SARMA) DF': number;
      'Lagrange Multiplier (SARMA) Value': number;
      'Lagrange Multiplier (SARMA) Probability': number;
    };
  };
};

export async function linearRegression({
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
}: LinearRegressionProps): Promise<LinearRegressionResult> {
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

  const regReport = wasmInstance.linearRegression(
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
  for (let i = 0; i < xNames.length + 1; ++i) {
    coefficients.push({
      Variable: regReport.GetXVarName(i),
      Coefficient: regReport.GetCoefficient(i),
      'Std Error': regReport.GetStdError(i),
      't-Statistic': regReport.GetZValue(i),
      Probability: regReport.GetProbability(i)
    });
  }

  const result = {
    type: 'linearRegression',
    dependentVariable: yName,
    independentVariables: xNames,
    title: 'ORDINARY LEAST SQUARES ESTIMATION',
    datasetName,
    weightsId,
    'Number of Observations': regReport.GetNoObservation(),
    'Mean Dependent Var': regReport.GetMeanY(),
    'Number of Variables': xNames.length + 1,
    'SD Dependent Var': regReport.GetSDevY(),
    'Degrees of Freedom': regReport.GetNoObservation() - xNames.length - 1,
    'R-squared': regReport.GetR2(),
    'Adjusted R-squared': regReport.GetR2_adjust(),
    'F-statistic': regReport.GetFtest(),
    'Prob(F-statistic)': regReport.GetFtestProb(),
    'Sum Squared Residual': regReport.GetRSS(),
    'Log Likelihood': regReport.GetLIK(),
    'Sigma-Square': regReport.GetSIQ_SQ(),
    'Akaike Info Criterion': regReport.GetAIC(),
    'SE of Regression': Math.sqrt(regReport.GetSIQ_SQ()),
    'Schwarz Criterion': regReport.GetOLS_SC(),
    'Sigma-Square ML': regReport.GetSIQ_SQLM(),
    'SE of Regression ML': Math.sqrt(regReport.GetSIQ_SQLM()),
    'Variable Coefficients': coefficients,
    'REGRESSION DIAGNOSTICS': {
      'MULTICOLLINEARITY CONDITION NUMBER': regReport.GetConditionNumber(),
      'TEST ON NORMALITY OF ERRORS': {
        Test: 'Jarque-Bera',
        'Jarque-Bera DF': regReport.GetJBtest(0),
        'Jarque-Bera Value': regReport.GetJBtest(1),
        'Jarque-Bera Probability': regReport.GetJBtest(2)
      }
    },
    'DIAGNOSTICS FOR HETEROSKEDASTICITY': {
      'BREUSCH-PAGAN TEST': {
        Test: 'Breusch-Pagan',
        'Breusch-Pagan DF': regReport.GetBPtest(0),
        'Breusch-Pagan Value': regReport.GetBPtest(1),
        'Breusch-Pagan Probability': regReport.GetBPtest(2)
      },
      'KOENKER-Bassett TEST': {
        Test: 'Koenker-Bassett',
        'Koenker-Bassett DF': regReport.GetKBtest(0),
        'Koenker-Bassett Value': regReport.GetKBtest(1),
        'Koenker-Bassett Probability': regReport.GetKBtest(2)
      }
    },
    'DIAGNOSTICS FOR SPATIAL DEPENDENCE': {
      "Moran's I (error)": {
        Test: "Moran's I (error)",
        "Moran's I (error)": regReport.GetMoranI(0),
        'Moran’s I (error) Z': regReport.GetMoranI(1),
        'Moran’s I (error) Probability': regReport.GetMoranI(2)
      },
      'Lagrange Multiplier (lag)': {
        Test: 'Lagrange Multiplier (lag)',
        'Lagrange Multiplier (lag) DF': regReport.GetLMLAG(0),
        'Lagrange Multiplier (lag) Value': regReport.GetLMLAG(1),
        'Lagrange Multiplier (lag) Probability': regReport.GetLMLAG(2)
      },
      'Robust LM (lag)': {
        Test: 'Robust LM (lag)',
        'Robust LM (lag) DF': regReport.GetLMLAGRob(0),
        'Robust LM (lag) Value': regReport.GetLMLAGRob(1),
        'Robust LM (lag) Probability': regReport.GetLMLAGRob(2)
      },
      'Lagrange Multiplier (error)': {
        Test: 'Lagrange Multiplier (error)',
        'Lagrange Multiplier (error) DF': regReport.GetLMERR(0),
        'Lagrange Multiplier (error) Value': regReport.GetLMERR(1),
        'Lagrange Multiplier (error) Probability': regReport.GetLMERR(2)
      },
      'Robust LM (error)': {
        Test: 'Robust LM (error)',
        'Robust LM (error) DF': regReport.GetLMERRRob(0),
        'Robust LM (error) Value': regReport.GetLMERRRob(1),
        'Robust LM (error) Probability': regReport.GetLMERRRob(2)
      },
      'Lagrange Multiplier (SARMA)': {
        Test: 'Lagrange Multiplier (SARMA)',
        'Lagrange Multiplier (SARMA) DF': regReport.GetLMSarma(0),
        'Lagrange Multiplier (SARMA) Value': regReport.GetLMSarma(1),
        'Lagrange Multiplier (SARMA) Probability': regReport.GetLMSarma(2)
      }
    }
  };

  return result;
}

// eslint-disable-next-line max-statements
export function printLinearRegressionResult(regressionReport: LinearRegressionResult): string {
  // print the regression report using GeoDa's format
  let output = '';
  output += `Dataset: ${regressionReport.datasetName}\n`;
  output += `${regressionReport.weightsId ? `Weights: ${regressionReport.weightsId}\n` : ''}`;
  output += `Dependent Variable: ${regressionReport.dependentVariable}\n`;
  output += `Mean Dependent Var: ${regressionReport['Mean Dependent Var']}\n`;
  output += `SD Dependent Var: ${regressionReport['SD Dependent Var']}\n`;
  output += `No. Observations: ${regressionReport['Number of Observations']}\n`;
  output += `Degrees of Freedom: ${regressionReport['Degrees of Freedom']}\n`;
  output += `R-squared: ${regressionReport['R-squared']}\n`;
  output += `Adj. R-squared: ${regressionReport['Adjusted R-squared']}\n`;
  output += `F-statistic: ${regressionReport['F-statistic']}\n`;
  output += `Prob(F-statistic): ${regressionReport['Prob(F-statistic)']}\n`;
  output += `Log-Likelihood: ${regressionReport['Log Likelihood']}\n`;
  output += `Akaike Info Criterion: ${regressionReport['Akaike Info Criterion']}\n`;
  output += `Schwarz Criterion: ${regressionReport['Schwarz Criterion']}\n`;
  output += `Sum squared residual: ${regressionReport['Sum Squared Residual']}\n`;
  output += `Sigma-square: ${regressionReport['Sigma-Square']}\n`;
  output += `SE of regression: ${regressionReport['SE of Regression']}\n`;
  output += `Sigma-Square ML: ${regressionReport['Sigma-Square ML']}\n`;
  output += `S.E. of regression ML: ${Math.sqrt(regressionReport['Sigma-Square ML'])}\n`;
  output += `Variable Coefficients:\n`;
  output += `Variable\tCoefficient\tStd. Error\tt-Statistic\tProbability\n`;
  for (const coefficient of regressionReport['Variable Coefficients']) {
    output += `${coefficient.Variable}\t${coefficient.Coefficient}\t${coefficient['Std Error']}\t${coefficient['t-Statistic']}\t${coefficient.Probability}\n`;
  }
  output += `\n\n#REGRESSION DIAGNOSTICS*\n`;
  output += `Multicollinearity Condition Number: ${regressionReport['REGRESSION DIAGNOSTICS']['MULTICOLLINEARITY CONDITION NUMBER']}\n`;
  output += `Test on Normality of Errors:\n`;
  output += `Test\tJarque-Bera DF\tJarque-Bera Value\tJarque-Bera Probability\n`;
  const normalityTest = regressionReport['REGRESSION DIAGNOSTICS']['TEST ON NORMALITY OF ERRORS'];
  output += `${normalityTest.Test}\t${normalityTest['Jarque-Bera DF']}\t${normalityTest['Jarque-Bera Value']}\t${normalityTest['Jarque-Bera Probability']}\n\n`;
  output += `DIAGNOSTICS FOR HETEROSKEDASTICITY\n`;
  output += `Breusch-Pagan Test:\n`;
  output += `Test\tBreusch-Pagan DF\tBreusch-Pagan Value\tBreusch-Pagan Probability\n`;
  const bpTest = regressionReport['DIAGNOSTICS FOR HETEROSKEDASTICITY']['BREUSCH-PAGAN TEST'];
  output += `${bpTest.Test}\t${bpTest['Breusch-Pagan DF']}\t${bpTest['Breusch-Pagan Value']}\t${bpTest['Breusch-Pagan Probability']}\n`;
  output += `Koenker-Bassett Test:\n`;
  output += `Test\tKoenker-Bassett DF\tKoenker-Bassett Value\tKoenker-Bassett Probability\n`;
  const kbTest = regressionReport['DIAGNOSTICS FOR HETEROSKEDASTICITY']['KOENKER-Bassett TEST'];
  output += `${kbTest.Test}\t${kbTest['Koenker-Bassett DF']}\t${kbTest['Koenker-Bassett Value']}\t${kbTest['Koenker-Bassett Probability']}\n\n`;
  if (regressionReport.weightsId) {
    output += `DIAGNOSTICS FOR SPATIAL DEPENDENCE\n`;
    output += `Moran's I (error):\n`;
    output += `Test\tMoran's I (error)\tMoran’s I (error) Z\tMoran’s I (error) Probability\n`;
    const moranI = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']["Moran's I (error)"];
    output += `${moranI.Test}\t${moranI["Moran's I (error)"]}\t${moranI['Moran’s I (error) Z']}\t${moranI['Moran’s I (error) Probability']}\n`;
    output += `Lagrange Multiplier (lag):\n`;
    output += `Test\tLagrange Multiplier (lag) DF\tLagrange Multiplier (lag) Value\tLagrange Multiplier (lag) Probability\n`;
    const lmLag =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (lag)'];
    output += `${lmLag.Test}\t${lmLag['Lagrange Multiplier (lag) DF']}\t${lmLag['Lagrange Multiplier (lag) Value']}\t${lmLag['Lagrange Multiplier (lag) Probability']}\n`;
    output += `Robust LM (lag):\n`;
    output += `Test\tRobust LM (lag) DF\tRobust LM (lag) Value\tRobust LM (lag) Probability\n`;
    const lmLagRob = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Robust LM (lag)'];
    output += `${lmLagRob.Test}\t${lmLagRob['Robust LM (lag) DF']}\t${lmLagRob['Robust LM (lag) Value']}\t${lmLagRob['Robust LM (lag) Probability']}\n`;
    output += `Lagrange Multiplier (error):\n`;
    output += `Test\tLagrange Multiplier (error) DF\tLagrange Multiplier (error) Value\tLagrange Multiplier (error) Probability\n`;
    const lmError =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (error)'];
    output += `${lmError.Test}\t${lmError['Lagrange Multiplier (error) DF']}\t${lmError['Lagrange Multiplier (error) Value']}\t${lmError['Lagrange Multiplier (error) Probability']}\n`;
    output += `Robust LM (error):\n`;
    output += `Test\tRobust LM (error) DF\tRobust LM (error) Value\tRobust LM (error) Probability\n`;
    const lmErrorRob = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Robust LM (error)'];
    output += `${lmErrorRob.Test}\t${lmErrorRob['Robust LM (error) DF']}\t${lmErrorRob['Robust LM (error) Value']}\t${lmErrorRob['Robust LM (error) Probability']}\n`;
    output += `Lagrange Multiplier (SARMA):\n`;
    output += `Test\tLagrange Multiplier (SARMA) DF\tLagrange Multiplier (SARMA) Value\tLagrange Multiplier (SARMA) Probability\n`;
    const lmSarma =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (SARMA)'];
    output += `${lmSarma.Test}\t${lmSarma['Lagrange Multiplier (SARMA) DF']}\t${lmSarma['Lagrange Multiplier (SARMA) Value']}\t${lmSarma['Lagrange Multiplier (SARMA) Probability']}\n`;
    output += `Based on the spatial diagnostics, the recommended model is: ${selectSpatialModel(
      regressionReport
    )}\n`;
  }
  return output;
}

// function to print number with 4 decimal places
export function printNumber(num: number): string {
  // if num is float and has more than 4 decimal places, round it to 4 decimal places; otherwise return the number as is
  const numStr = num.toString();
  if (numStr.includes('.')) {
    const decimalPlaces = numStr.split('.')[1].length;
    if (decimalPlaces > 4) {
      return num.toFixed(4);
    }
  }
  return num.toString();
}

export function printVariableCoefficients(
  report: LinearRegressionResult | SpatialErrorResult | SpatialLagResult
): string {
  let output = '';
  output += `Variable Coefficients: \n\n`;
  output += `| Variable&nbsp;&nbsp; | Coefficient&nbsp;&nbsp; | Std. Error&nbsp;&nbsp; | t-Statistic | Probability |\n`;
  output += `|---------|-------------|------------|-------------|-------------|\n`;
  for (const coefficient of report['Variable Coefficients']) {
    output += `${coefficient.Variable} | ${printNumber(coefficient.Coefficient)} | ${printNumber(
      coefficient['Std Error']
    )} | ${printNumber(coefficient['t-Statistic'])} | ${printNumber(coefficient.Probability)}\n`;
  }
  return output;
}

// eslint-disable-next-line max-statements
export function printLinearRegressionResultUsingMarkdown(
  regressionReport: LinearRegressionResult
): string {
  // print the linearRegression result in GeoDa's format using Markdown
  let output = '';
  output += `Dataset: ${regressionReport.datasetName}\n`;
  output += `${regressionReport.weightsId ? `Weights: ${regressionReport.weightsId}\n` : ''}`;
  output += '|  |  |  |  |\n';
  output += '|---|---|---|---|\n';
  output += `|Dependent Variable |${
    regressionReport.dependentVariable
  }| No. Observations |${printNumber(regressionReport['Number of Observations'])}|\n`;
  output += `|Mean Dependent Var | ${printNumber(
    regressionReport['Mean Dependent Var']
  )}| Number of Variables | ${regressionReport['Number of Variables']} |\n`;
  output += `|S.D. dependent var| ${printNumber(
    regressionReport['SD Dependent Var']
  )}| Degrees of Freedom | ${regressionReport['Degrees of Freedom']} |\n`;

  output += `&nbsp;  \n`;
  output += '|  |  |  |  |\n';
  output += `|R-squared| ${printNumber(regressionReport['R-squared'])}| F-statistic | ${printNumber(
    regressionReport['F-statistic']
  )}|\n`;
  output += `|Adj. R-squared| ${printNumber(
    regressionReport['Adjusted R-squared']
  )}| Prob(F-statistic)| ${printNumber(regressionReport['Prob(F-statistic)'])}|\n`;
  output += `|Sum squared residual| ${printNumber(
    regressionReport['Sum Squared Residual']
  )}|Log-Likelihood| ${printNumber(regressionReport['Log Likelihood'])}|\n`;
  output += `|Sigma-square| ${printNumber(regressionReport['Sigma-Square'])}|AIC| ${printNumber(
    regressionReport['Akaike Info Criterion']
  )}|\n`;
  output += `|S.E. of regression| ${printNumber(
    regressionReport['SE of Regression']
  )}|Schwarz Criterion| ${printNumber(regressionReport['Schwarz Criterion'])}|\n`;
  output += `|Sigma-square ML| ${printNumber(Math.sqrt(regressionReport['Sigma-Square ML']))}|||\n`;
  output += `|S.E. of regression ML| ${printNumber(
    Math.sqrt(regressionReport['Sigma-Square ML'])
  )}|||\n`;

  output += `&nbsp;  \n`;
  output += printVariableCoefficients(regressionReport);

  output += `&nbsp;  \n`;
  output += `\nREGRESSION DIAGNOSTICS\n`;
  output += `&nbsp;  \n`;
  output += `&nbsp;  \n`;
  output += `Multicollinearity Condition Number: ${printNumber(
    regressionReport['REGRESSION DIAGNOSTICS']['MULTICOLLINEARITY CONDITION NUMBER']
  )}\n\n`;
  output += `Test on Normality of Errors:\n\n`;
  output += `Test&nbsp;&nbsp; | DF&nbsp;&nbsp; | Value | Probability\n`;
  output += `-----|----------------|-------------------| -----------------------:\n`;
  const normalityTest = regressionReport['REGRESSION DIAGNOSTICS']['TEST ON NORMALITY OF ERRORS'];
  output += `${normalityTest.Test} | ${printNumber(
    normalityTest['Jarque-Bera DF']
  )} | ${printNumber(normalityTest['Jarque-Bera Value'])} | ${printNumber(
    normalityTest['Jarque-Bera Probability']
  )}\n\n`;
  output += `&nbsp;  \n`;
  output += `&nbsp;  \n`;
  output += `DIAGNOSTICS FOR HETEROSKEDASTICITY`;
  output += `&nbsp;  \n`;
  output += `RANDOM COEFFICIENTS\n\n`;
  output += `| Test | DF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Probability|\n`;
  output += `|------|----|-------|------------|\n`;
  const bpTest = regressionReport['DIAGNOSTICS FOR HETEROSKEDASTICITY']['BREUSCH-PAGAN TEST'];
  output += `|${bpTest.Test}| ${printNumber(bpTest['Breusch-Pagan DF'])} | ${printNumber(
    bpTest['Breusch-Pagan Value']
  )} | ${printNumber(bpTest['Breusch-Pagan Probability'])}|\n`;
  const kbTest = regressionReport['DIAGNOSTICS FOR HETEROSKEDASTICITY']['KOENKER-Bassett TEST'];
  output += `|${kbTest.Test}| ${printNumber(kbTest['Koenker-Bassett DF'])} | ${printNumber(
    kbTest['Koenker-Bassett Value']
  )} | ${printNumber(kbTest['Koenker-Bassett Probability'])} |\n`;

  if (regressionReport.weightsId) {
    output += `&nbsp;  \n`;
    output += `&nbsp;  \n`;
    output += `DIAGNOSTICS FOR SPATIAL DEPENDENCE\n\n`;
    output += `Test | MI/DF&nbsp;&nbsp; | Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Probability\n`;
    output += `-----|-------|-------|------------\n`;

    const moranI = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']["Moran's I (error)"];
    output += `${moranI.Test} | ${printNumber(moranI["Moran's I (error)"])} | ${printNumber(
      moranI['Moran’s I (error) Z']
    )} | ${printNumber(moranI['Moran’s I (error) Probability'])}\n`;

    const lmLag =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (lag)'];
    output += `${lmLag.Test} | ${printNumber(
      lmLag['Lagrange Multiplier (lag) DF']
    )} | ${printNumber(lmLag['Lagrange Multiplier (lag) Value'])} | ${printNumber(
      lmLag['Lagrange Multiplier (lag) Probability']
    )}\n`;

    const lmLagRob = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Robust LM (lag)'];
    output += `${lmLagRob.Test} | ${printNumber(lmLagRob['Robust LM (lag) DF'])} | ${printNumber(
      lmLagRob['Robust LM (lag) Value']
    )} | ${printNumber(lmLagRob['Robust LM (lag) Probability'])}\n`;

    const lmError =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (error)'];
    output += `${lmError.Test} | ${printNumber(
      lmError['Lagrange Multiplier (error) DF']
    )} | ${printNumber(lmError['Lagrange Multiplier (error) Value'])} | ${printNumber(
      lmError['Lagrange Multiplier (error) Probability']
    )}\n`;

    const lmErrorRob = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Robust LM (error)'];
    output += `${lmErrorRob.Test} | ${printNumber(
      lmErrorRob['Robust LM (error) DF']
    )} | ${printNumber(lmErrorRob['Robust LM (error) Value'])} | ${printNumber(
      lmErrorRob['Robust LM (error) Probability']
    )}\n`;

    const lmSarma =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (SARMA)'];
    output += `${lmSarma.Test} | ${printNumber(
      lmSarma['Lagrange Multiplier (SARMA) DF']
    )} | ${printNumber(lmSarma['Lagrange Multiplier (SARMA) Value'])} | ${printNumber(
      lmSarma['Lagrange Multiplier (SARMA) Probability']
    )}\n`;

    output += `&nbsp;  \n`;
    output += `&nbsp;  \n`;
    output += `Based on the spatial diagnostics, the recommended model is: ${selectSpatialModel(
      regressionReport
    )}\n`;
  }

  return output;
}

/**
 * function to check which spatail model should be used based on spatial diagnostics
 */
// eslint-disable-next-line complexity
export function selectSpatialModel(regressionReport: LinearRegressionResult): string {
  let model = 'OLS Model';
  if (regressionReport.weightsId) {
    // check the probability of Lagrange Multiplier (lag), and Lagrange Multiplier (error)
    const lmLag =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (lag)'];
    const lmError =
      regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Lagrange Multiplier (error)'];

    // if both of them are significant, check the probability of Robust LM (lag) and Robust LM (error)
    if (
      lmLag['Lagrange Multiplier (lag) Probability'] <= 0.05 &&
      lmError['Lagrange Multiplier (error) Probability'] <= 0.05
    ) {
      const lmLagRob = regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Robust LM (lag)'];
      const lmErrorRob =
        regressionReport['DIAGNOSTICS FOR SPATIAL DEPENDENCE']['Robust LM (error)'];
      if (
        lmLagRob['Robust LM (lag) Probability'] <= 0.05 &&
        lmErrorRob['Robust LM (error) Probability'] <= 0.05
      ) {
        // if both of them are significant, return the model that has the smaller probability
        // eslint-disable-next-line max-depth
        if (
          lmLag['Lagrange Multiplier (lag) Probability'] <
          lmError['Lagrange Multiplier (error) Probability']
        ) {
          model = 'Spatial Lag Model';
        } else {
          model = 'Spatial Error Model';
        }
      } else if (lmLagRob['Robust LM (lag) Probability'] <= 0.05) {
        model = 'Spatial Lag Model';
      } else if (lmErrorRob['Robust LM (error) Probability'] <= 0.05) {
        model = 'Spatial Error Model';
      } else {
        // if none of them is significant, return the lmLag or lmError model which has smaller probability
        // eslint-disable-next-line max-depth
        if (
          lmLag['Lagrange Multiplier (lag) Probability'] <
          lmError['Lagrange Multiplier (error) Probability']
        ) {
          model = 'Spatial Lag Model';
        } else {
          model = 'Spatial Error Model';
        }
      }
    } else if (lmLag['Lagrange Multiplier (lag) Probability'] <= 0.05) {
      //  if one of them is significant, return the model that is significant
      model = 'Spatial Lag Model';
    } else if (lmError['Lagrange Multiplier (error) Probability'] <= 0.05) {
      model = 'Spatial Error Model';
    } else {
      // if none of them is significant (larger than 0.05), set model to OLS and return
      model = 'OLS Model';
    }
  }
  return model;
}
