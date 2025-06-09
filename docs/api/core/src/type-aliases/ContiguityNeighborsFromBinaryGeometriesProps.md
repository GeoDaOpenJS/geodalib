[geodalib](../../../modules.md) / [core/src](../index.md) / ContiguityNeighborsFromBinaryGeometriesProps

# Type Alias: ContiguityNeighborsFromBinaryGeometriesProps

> **ContiguityNeighborsFromBinaryGeometriesProps**: `object`

Defined in: [core/src/weights/contiguity-neighbors.ts:54](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/weights/contiguity-neighbors.ts#L54)

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

### useCentroids?

> `optional` **useCentroids**: `boolean`

Whether to use centroids for neighbor calculations
