[geodalib](../../../modules.md) / [lisa/src](../index.md) / spatialLag

# Function: spatialLag()

> **spatialLag**(`values`, `neighbors`, `rowStandardize`, `weights`?, `useSelfNeighbor`?): `number`[]

Defined in: [lisa/src/sa/spatial-lag.ts:24](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/spatial-lag.ts#L24)

Compute spatial lag of a list of values based on a list of neighbors and weights.

## Example
```ts
import { spatialLag } from '@geoda/lisa';

const values = [1, 2, 3, 4, 5];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = spatialLag(values, neighbors);

console.log(result);
```

## Parameters

### values

`number`[]

The numeric values to compute spatial lag for.

### neighbors

`number`[][]

The list of neighbors for each value.

### rowStandardize

`boolean` = `true`

The flag to row standardize the spatial lag.

### weights?

`number`[][]

The weight values for each neighbor.

### useSelfNeighbor?

`boolean`

The flag to include self as a neighbor.

## Returns

`number`[]

The spatial lag values.
