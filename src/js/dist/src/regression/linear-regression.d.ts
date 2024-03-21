export declare function dotProduct(x: number[], y: number[]): Promise<number>;
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
export type LinearRegressionResult = {
    type: 'linearRegression';
    dependentVariable: string;
    independentVariables: string[];
    title: string;
    datasetName: string;
    'number of observations': number;
    'Mean dependent var': number;
    'Number of Variables': number;
    SD_dependent_var: number;
    Degrees_of_Freedom: number;
    'R-squared': number;
    'Adjusted R-squared': number;
    'F-statistic': number;
    'Prob(F-statistic)': number;
    'Log likelihood': number;
    'Sum squared residual': number;
    'Sigma-square': number;
    'Akaike info criterion': number;
    'SE of regression': number;
    'Schwarz criterion': number;
    'Variable Coefficients': {
        [key: string]: {
            coefficient: number;
            stdError: number;
            tStatistic: number;
            prob: number;
        };
    };
    'Condition Number': number;
    'REGRESSION DIAGNOSTICS': {
        'MULTICOLLINEARITY CONDITION NUMBER': number;
        'TEST ON NORMALITY OF ERRORS': {
            Test: 'Jarque-Bera';
            'Jarque-Bera DF': number;
            'Jarque-Bera Value': number;
            'Jarque-Bera Probability': number;
        };
    };
};
export declare function linearRegression({ x, y, weights, xNames, yName, datasetName, xUndefs, yUndefs }: LinearRegressionProps): Promise<LinearRegressionResult>;
