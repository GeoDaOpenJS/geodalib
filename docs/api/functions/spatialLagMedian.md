[geoda-wasm](../globals.md) / spatialLagMedian

# Function: spatialLagMedian()

> **spatialLagMedian**(`values`, `neighbors`): `number`[]

Defined in: [src/sa/spatial-lag.ts:81](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/sa/spatial-lag.ts#L81)

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
