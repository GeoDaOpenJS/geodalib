[geodalib](../../../modules.md) / [core/src](../index.md) / ContiguityNeighborsFromGeomCollectionProps

# Type Alias: ContiguityNeighborsFromGeomCollectionProps

> **ContiguityNeighborsFromGeomCollectionProps**: `object`

Defined in: [core/src/weights/contiguity-neighbors.ts:88](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/weights/contiguity-neighbors.ts#L88)

Interface for the arguments used in calculating contiguity neighbors from a geometry collection.

## Type declaration

### geomCollection

> **geomCollection**: [`GeometryCollection`](../classes/GeometryCollection.md)

The geometry collection to calculate the neighbors for

### includeLowerOrder?

> `optional` **includeLowerOrder**: `boolean`

Whether to include lower orders in the results

### isQueen

> **isQueen**: `boolean`

Whether to use queen contiguity (true) or rook contiguity (false)

### orderOfContiguity?

> `optional` **orderOfContiguity**: `number`

The order of contiguity to calculate

### precisionThreshold?

> `optional` **precisionThreshold**: `number`

Threshold for considering points as neighbors

### useCentroids?

> `optional` **useCentroids**: `boolean`

Whether to use centroids for neighbor calculations
