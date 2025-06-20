[geodalib](../../../modules.md) / [core/src](../index.md) / queenWeights

# Function: queenWeights()

> **queenWeights**(`geometries`, `useCentroids`?, `precisionThreshold`?, `orderOfContiguity`?, `includeLowerOrder`?): `Promise`\<[`WeightsMeta`](../type-aliases/WeightsMeta.md)\>

Defined in: [core/src/weights/contiguity-neighbors.ts:223](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/weights/contiguity-neighbors.ts#L223)

## Description
Create Queen contiguity weights for GeoJSON features.

Queen contiguity defines neighbors as spatial units that share either:
- A common edge (border)
- A common vertex (corner)

This is in contrast to Rook contiguity, which only considers shared edges.

## Example
```ts
import { queenWeights } from '@geoda/core';

const geometries = [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
];

const weights = await queenWeights(geometries);

console.log(weights);
```

## Parameters

### geometries

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The geometries used to create the queen contiguity weights. See [SpatialGeometry](../type-aliases/SpatialGeometry.md) for more information.

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
