import { LinearRegressionProps } from './linear-regression';
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
export declare function spatialError({ x, y, weightsId, weights, weightsValues, xNames, yName, datasetName, xUndefs, yUndefs }: LinearRegressionProps): Promise<SpatialErrorResult>;
