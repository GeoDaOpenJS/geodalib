[geodalib](../../../modules.md) / [lisa/src](../index.md) / bivariateLocalMoran

# Function: bivariateLocalMoran()

> **bivariateLocalMoran**(`props`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/local-moran.ts:160](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/local-moran.ts#L160)

Calculates bivariate Local Moran's I statistics to measure spatial correlation
between two variables

## Example
```ts
import { bivariateLocalMoran } from '@geoda/lisa';

const data1 = [1, 2, 3, 4, 5];
const data2 = [1, 2, 3, 4, 5];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = await bivariateLocalMoran({
  data1,
  data2,
  neighbors,
});

console.log(result);
```

## Parameters

### props

[`BivariateLocalMoranProps`](../type-aliases/BivariateLocalMoranProps.md)

Configuration object for bivariate Local Moran's I

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Promise resolving to Local Moran statistics and cluster assignments
