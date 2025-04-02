[geodalib](../../../modules.md) / [core/src](../index.md) / rookWeights

# Function: rookWeights()

> **rookWeights**(`geometries`, `useCentroids`?, `precisionThreshold`?, `orderOfContiguity`?, `includeLowerOrder`?): `Promise`\<[`WeightsMeta`](../type-aliases/WeightsMeta.md)\>

Defined in: [core/src/weights/contiguity-neighbors.ts:196](https://github.com/GeoDaCenter/geoda-lib/blob/5c8fba7800a0ff8c8ed4b8b260cc40d1229fb38a/js/packages/core/src/weights/contiguity-neighbors.ts#L196)

## Description
Create Rook contiguity weights for GeoJSON features.

Rook contiguity defines neighbors as spatial units that only share common edge (border)

This is in contrast to Queen contiguity, which considers shared edges and vertices.

## Parameters

### geometries

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The geometries used to create the rook contiguity weights. See [SpatialGeometry](../type-aliases/SpatialGeometry.md) for more information.

### useCentroids?

`boolean` = `false`

If true, uses geometry centroids for calculations

### precisionThreshold?

`number` = `0.0`

Distance threshold for determining neighbors.
                                          Useful when geometries don't perfectly align

### orderOfContiguity?

`number` = `1`

Number of steps to consider for neighbor relationships.
                                        1 means immediate neighbors only

### includeLowerOrder?

`boolean` = `false`

If true, includes all neighbors from order 1
                                            up to the specified order

## Returns

`Promise`\<[`WeightsMeta`](../type-aliases/WeightsMeta.md)\>

Spatial weights metadata including neighbor relationships
