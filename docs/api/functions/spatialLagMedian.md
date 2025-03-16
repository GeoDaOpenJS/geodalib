[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / spatialLagMedian

# Function: spatialLagMedian()

> **spatialLagMedian**(`values`, `neighbors`): `number`[]

Defined in: [src/sa/spatial-lag.ts:81](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/sa/spatial-lag.ts#L81)

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
