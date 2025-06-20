[geodalib](../../../modules.md) / [regression/src](../index.md) / spatialError

# Function: spatialError()

> **spatialError**(`props`): `Promise`\<[`SpatialErrorResult`](../type-aliases/SpatialErrorResult.md)\>

Defined in: [regression/src/regression/spatial-error.ts:86](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/regression/src/regression/spatial-error.ts#L86)

Perform a spatial error regression analysis using maximum likelihood estimation.

## Example
```typescript
import { spatialErrorRegression } from '@geodash/regression';

// two independent variables, one dependent variable, and weights
// three observations
const weights = [[1], [0, 2], [0]];
const weightsValues = [1.0, 1.0, 1.0];

const result = await spatialErrorRegression({
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

The properties for the spatial error regression.

## Returns

`Promise`\<[`SpatialErrorResult`](../type-aliases/SpatialErrorResult.md)\>

The result of the spatial error regression.
