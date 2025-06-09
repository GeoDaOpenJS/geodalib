[geodalib](../../../modules.md) / [lisa/src](../index.md) / spatialLagMedian

# Function: spatialLagMedian()

> **spatialLagMedian**(`values`, `neighbors`): `number`[]

Defined in: [lisa/src/sa/spatial-lag.ts:82](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/lisa/src/sa/spatial-lag.ts#L82)

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
