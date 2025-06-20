[geodalib](../../../modules.md) / [lisa/src](../index.md) / localMoran

# Function: localMoran()

> **localMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/local-moran.ts:67](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/local-moran.ts#L67)

Calculates univariate Local Moran's I statistics for spatial autocorrelation

## Example
```ts
import { localMoran } from '@geoda/lisa';

const data = [1, 2, 3, 4, 5];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = await localMoran({
  data,
  neighbors,
});

console.log(result);
```

## Parameters

### props

[`LocalMoranProps`](../type-aliases/LocalMoranProps.md)

Configuration object for Local Moran's I calculation

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
