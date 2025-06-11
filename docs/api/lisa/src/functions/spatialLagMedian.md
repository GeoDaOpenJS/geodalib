[geodalib](../../../modules.md) / [lisa/src](../index.md) / spatialLagMedian

# Function: spatialLagMedian()

> **spatialLagMedian**(`values`, `neighbors`): `number`[]

Defined in: [lisa/src/sa/spatial-lag.ts:82](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/lisa/src/sa/spatial-lag.ts#L82)

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
