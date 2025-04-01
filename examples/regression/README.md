# Spatial Lag Regression Example

This example demonstrates how to use the `@geoda/regression` package to perform spatial lag regression analysis. The example uses test data to show how to run a spatial lag regression model with multiple independent variables.

## Overview

The example performs a spatial lag regression analysis using the following variables:

- Dependent variable: HR60 (Homicide Rate in 1960)
- Independent variables:
  - PO60 (Population in 1960)
  - UE60 (Unemployment Rate in 1960)

## Features

- Displays model inputs including variable names and sample data
- Shows the regression formula
- Presents detailed regression results including:
  - Coefficient estimates
  - Standard errors
  - P-values
  - Model diagnostics

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser and navigate to `http://localhost:5173`

## Data Source

The example uses test data from the `natregimes` dataset, which is included in the package for demonstration purposes. In a real application, you would replace these with your own data.

## Dependencies

- React
- @geoda/regression

## Usage

The example demonstrates how to:

1. Set up a spatial lag regression model
2. Specify dependent and independent variables
3. Include spatial weights matrix
4. Display model inputs and results

## License

This example is part of the GeoDa library and follows its licensing terms.
