[geodalib](../../../modules.md) / [lisa/src](../index.md) / spatialLagMedian

# Function: spatialLagMedian()

> **spatialLagMedian**(`values`, `neighbors`): `number`[]

Defined in: [lisa/src/sa/spatial-lag.ts:81](https://github.com/GeoDaCenter/geoda-lib/blob/5c8fba7800a0ff8c8ed4b8b260cc40d1229fb38a/js/packages/lisa/src/sa/spatial-lag.ts#L81)

Compute the median spatial lag of a list of values based on a list of neighbors and weights using the mean function.

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
