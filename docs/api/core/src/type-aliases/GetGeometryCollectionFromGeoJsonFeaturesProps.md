[geodalib](../../../modules.md) / [core/src](../index.md) / GetGeometryCollectionFromGeoJsonFeaturesProps

# Type Alias: GetGeometryCollectionFromGeoJsonFeaturesProps

> **GetGeometryCollectionFromGeoJsonFeaturesProps**: `object`

Defined in: [core/src/geometry/geojson-geometry.ts:28](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/geometry/geojson-geometry.ts#L28)

The type of the props for getGeometryCollectionFromGeoJson

## Type declaration

### convertToUTM?

> `optional` **convertToUTM**: `boolean`

Whether to convert to UTM

### features

> **features**: `Feature`[]

The features to convert

### fixPolygon?

> `optional` **fixPolygon**: `boolean`

Whether to fix the polygon

### wasm

> **wasm**: [`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The wasm module
