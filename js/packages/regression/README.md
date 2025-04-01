# @geoda/regression

This package provides implementations of various spatial regression models for analyzing spatial data. It includes the following models:

## Features

- OLS Regression
- Spatial Lag Model
- Spatial Error Model

## Installation

```bash
yarn add @geoda/regression
```

## Available Models

### 1. OLS Regression
Basic Ordinary Least Squares regression for spatial data analysis.

### 2. Spatial Lag Model
A spatial regression model that incorporates spatial dependence in the dependent variable. The model includes:
- Spatial lag coefficient (Rho)
- Maximum likelihood estimation
- Comprehensive diagnostics including:
  - Heteroskedasticity tests (Breusch-Pagan)
  - Spatial dependence tests (Likelihood Ratio)
  - Model fit statistics (R-squared, AIC, etc.)

### 3. Spatial Error Model
A spatial regression model that accounts for spatial autocorrelation in the error terms. The model includes:
- Spatial error coefficient (Lambda)
- Maximum likelihood estimation
- Comprehensive diagnostics including:
  - Heteroskedasticity tests (Breusch-Pagan)
  - Spatial dependence tests (Likelihood Ratio)
  - Model fit statistics (R-squared, AIC, etc.)

## Usage

Each model provides detailed output including:
- Model coefficients and standard errors
- Model fit statistics
- Diagnostic tests for spatial dependence and heteroskedasticity
- Variable-specific statistics

## Example

```typescript
import { spatialLagRegression } from '@geoda/regression';

const result = await spatialLagRegression({
  x: independentVariables,
  y: dependentVariable,
  weights: spatialWeights,
  xNames: ['var1', 'var2'],
  yName: 'target',
  datasetName: 'myDataset'
});
```

## Output Format

The regression results include:
- Basic model information (dataset name, number of observations, etc.)
- Model coefficients and their significance
- Model fit statistics (R-squared, AIC, etc.)
- Diagnostic tests for spatial effects
- Detailed variable-specific statistics

For more detailed information about each model, please refer to the [Spatial Regression documentation](/docs/reference/spatial-regression.md).
