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
    title: 'SUMMARY OF OUTPUT: ORDINARY LEAST SQUARES ESTIMATION',
    datasetName,
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
