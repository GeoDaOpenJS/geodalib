export declare function dotProduct(x: number[], y: number[]): Promise<number>;
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
export declare function linearRegression({ x, y, weightsId, weights, xNames, yName, datasetName, xUndefs, yUndefs }: LinearRegressionProps): Promise<LinearRegressionResult>;
export declare function printLinearRegressionResult(regressionReport: LinearRegressionResult): string;
export declare function printLinearRegressionResultUsingMarkdown(regressionReport: LinearRegressionResult): string;
/**
 * function to check which spatail model should be used based on spatial diagnostics
 */
export declare function selectSpatialModel(regressionReport: LinearRegressionResult): string;
