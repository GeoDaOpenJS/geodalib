[geodalib](../../../modules.md) / [core/src](../index.md) / ContiguityNeighborsFromBinaryGeometriesProps

# Type Alias: ContiguityNeighborsFromBinaryGeometriesProps

> **ContiguityNeighborsFromBinaryGeometriesProps**: `object`

Defined in: [core/src/weights/contiguity-neighbors.ts:54](https://github.com/GeoDaCenter/geoda-lib/blob/5c8fba7800a0ff8c8ed4b8b260cc40d1229fb38a/js/packages/core/src/weights/contiguity-neighbors.ts#L54)

Interface for the arguments used in calculating contiguity neighbors from binary geometries.

## Type declaration

### binaryGeometries

> **binaryGeometries**: `BinaryFeatureCollection`[]

The array of binary geometry features

### binaryGeometryType

> **binaryGeometryType**: [`BinaryGeometryType`](BinaryGeometryType.md)

The type of binary geometry

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

### useCentroids

> **useCentroids**: `boolean`

Whether to use centroids for neighbor calculations
