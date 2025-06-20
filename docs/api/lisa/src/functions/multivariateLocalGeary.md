[geodalib](../../../modules.md) / [lisa/src](../index.md) / multivariateLocalGeary

# Function: multivariateLocalGeary()

> **multivariateLocalGeary**(`__namedParameters`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/local-geary.ts:107](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/local-geary.ts#L107)

Get multivariate local Geary's C statistics.

## Example
```ts
import { multivariateLocalGeary } from '@geoda/lisa';

const data = [[1, 2], [3, 4], [5, 6]];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = await multivariateLocalGeary({
  data,
  neighbors,
});

console.log(result);
```

## Parameters

### \_\_namedParameters

[`MultivariateLocalGearyProps`](../type-aliases/MultivariateLocalGearyProps.md)

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>
