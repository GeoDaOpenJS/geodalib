[geodalib](../../../modules.md) / [lisa/src](../index.md) / spatialLagMedian

# Function: spatialLagMedian()

> **spatialLagMedian**(`values`, `neighbors`): `number`[]

Defined in: [lisa/src/sa/spatial-lag.ts:107](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/spatial-lag.ts#L107)

Compute the median spatial lag of a list of values based on a list of neighbors and weights using the mean function.

## Example
```ts
import { spatialLagMedian } from '@geoda/lisa';

const values = [1, 2, 3, 4, 5];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = spatialLagMedian(values, neighbors);

console.log(result);
```

## Parameters

### values

`number`[]

The numeric values to compute spatial lag for.

### neighbors

`number`[][]

The list of neighbors for each value.

## Returns

`number`[]

The spatial lag values.
