[geodalib](../../../modules.md) / [core/src](../index.md) / createWeights

# Function: createWeights()

> **createWeights**(`__namedParameters`): `Promise`\<\{ `weights`: `number`[][]; `weightsMeta`: [`WeightsMeta`](../type-aliases/WeightsMeta.md); \}\>

Defined in: [core/src/weights/utils.ts:63](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/weights/utils.ts#L63)

Create weights for the given geometries.

## Example
```ts
import { createWeights } from '@geoda/core';

const geometries = [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
];

const weights = await createWeights({
  weightsType: 'queen',
  geometries,
});

console.log(weights);
```

## Parameters

### \_\_namedParameters

[`CreateWeightsProps`](../type-aliases/CreateWeightsProps.md)

## Returns

`Promise`\<\{ `weights`: `number`[][]; `weightsMeta`: [`WeightsMeta`](../type-aliases/WeightsMeta.md); \}\>
