[geodalib](../../../modules.md) / [core/src](../index.md) / CreateWeightsProps

# Type Alias: CreateWeightsProps

> **CreateWeightsProps**: `object`

Defined in: [core/src/weights/utils.ts:8](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/weights/utils.ts#L8)

## Type declaration

### distanceThreshold?

> `optional` **distanceThreshold**: `number`

### geometries

> **geometries**: [`SpatialGeometry`](SpatialGeometry.md)

The geometries to create the weights for. See [SpatialGeometry](SpatialGeometry.md) for more information.
- GeoJSON features: Feature from geojson
- Binary feature collection: BinaryFeatureCollection from loaders.gl/schema
- Point layer data: [PointLayerData](PointLayerData.md) from kepler.gl
- Arc layer data: ArcLayerData from kepler.gl
- Hexagon id layer data: HexagonIdLayerData from kepler.gl

### includeLowerOrder?

> `optional` **includeLowerOrder**: `boolean`

Whether to include lower order neighbors

### isMile?

> `optional` **isMile**: `boolean`

### isQueen?

> `optional` **isQueen**: `boolean`

### isRook?

> `optional` **isRook**: `boolean`

### k?

> `optional` **k**: `number`

### orderOfContiguity?

> `optional` **orderOfContiguity**: `number`

The order of contiguity for neighbor calculations

### precisionThreshold?

> `optional` **precisionThreshold**: `number`

The precision threshold for neighbor calculations

### useCentroids?

> `optional` **useCentroids**: `boolean`

Whether to use centroids for neighbor calculations

### weightsType

> **weightsType**: `"knn"` \| `"threshold"` \| `"queen"` \| `"rook"`
