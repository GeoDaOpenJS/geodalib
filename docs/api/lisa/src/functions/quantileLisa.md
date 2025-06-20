[geodalib](../../../modules.md) / [lisa/src](../index.md) / quantileLisa

# Function: quantileLisa()

> **quantileLisa**(`__namedParameters`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/quantile-lisa.ts:42](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/quantile-lisa.ts#L42)

Get local Quantile Lisa statistics

## Example
```ts
import { quantileLisa } from '@geoda/lisa';

const data = [1, 2, 3, 4, 5];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = await quantileLisa({
  k: 3,
  quantile: 0.5,
  data,
  neighbors,
});
```

## Parameters

### \_\_namedParameters

[`QuantileLisaProps`](../type-aliases/QuantileLisaProps.md)

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

LISA result
