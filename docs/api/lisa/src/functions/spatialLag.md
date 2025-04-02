[geodalib](../../../modules.md) / [lisa/src](../index.md) / spatialLag

# Function: spatialLag()

> **spatialLag**(`values`, `neighbors`, `rowStandardize`, `weights`?, `useSelfNeighbor`?): `number`[]

Defined in: [lisa/src/sa/spatial-lag.ts:11](https://github.com/GeoDaCenter/geoda-lib/blob/246bf05338fdf79294f778f8829940c18b17a0f8/js/packages/lisa/src/sa/spatial-lag.ts#L11)

Compute spatial lag of a list of values based on a list of neighbors and weights.

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
