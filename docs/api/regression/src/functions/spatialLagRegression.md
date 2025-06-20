[geodalib](../../../modules.md) / [regression/src](../index.md) / spatialLagRegression

# Function: spatialLagRegression()

> **spatialLagRegression**(`props`): `Promise`\<[`SpatialLagResult`](../type-aliases/SpatialLagResult.md)\>

Defined in: [regression/src/regression/spatial-lag.ts:84](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/regression/src/regression/spatial-lag.ts#L84)

Perform a spatial lag regression analysis using maximum likelihood estimation.

## Example
```typescript
import { spatialLagRegression } from '@geodash/regression';

// two independent variables, one dependent variable, and weights
// three observations
const weights = [[1], [0, 2], [0]];
const weightsValues = [1.0, 1.0, 1.0];

const result = await spatialLagRegression({
  x: [[1, 2, 3], [4, 5, 6]],
  y: [1, 2, 3],
  weightsId: 'weights',
  weights,
  weightsValues,
  xNames: ['x1', 'x2'],
  yName: 'y',
  datasetName: 'dataset',
});
```

## Parameters

### props

[`LinearRegressionProps`](../type-aliases/LinearRegressionProps.md)

The properties for the spatial lag regression.

## Returns

`Promise`\<[`SpatialLagResult`](../type-aliases/SpatialLagResult.md)\>

The result of the spatial lag regression.
