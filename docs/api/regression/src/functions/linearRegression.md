[geodalib](../../../modules.md) / [regression/src](../index.md) / linearRegression

# Function: linearRegression()

> **linearRegression**(`__namedParameters`): `Promise`\<[`LinearRegressionResult`](../type-aliases/LinearRegressionResult.md)\>

Defined in: [regression/src/regression/linear-regression.ts:181](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/regression/src/regression/linear-regression.ts#L181)

Perform a linear regression analysis using OLS.

## Example
```typescript
import { linearRegression } from '@geodash/regression';

const result = await linearRegression({
  x: [[1, 2, 3], [4, 5, 6]],
  y: [1, 2, 3],
  xNames: ['x1', 'x2', 'x3'],
  yName: 'y',
  datasetName: 'dataset',
});
```

## Example with spatial diagnostics
```typescript
import { linearRegression } from '@geodash/regression';

// two independent variables, one dependent variable, and weights
// three observations
const weights = [[1], [0, 2], [0]];
const weightsValues = [1.0, 1.0, 1.0];

const result = await linearRegression({
  x: [[1, 2, 3], [4, 5, 6]],
  y: [1, 2, 3],
  xNames: ['x1', 'x2'],
  yName: 'y',
  datasetName: 'dataset',
  weightsId: 'weights',
  weights
});
```

## Parameters

### \_\_namedParameters

[`LinearRegressionProps`](../type-aliases/LinearRegressionProps.md)

## Returns

`Promise`\<[`LinearRegressionResult`](../type-aliases/LinearRegressionResult.md)\>

The result of the linear regression analysis.
