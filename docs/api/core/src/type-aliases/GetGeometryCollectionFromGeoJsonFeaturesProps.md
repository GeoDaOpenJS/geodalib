[geodalib](../../../modules.md) / [core/src](../index.md) / GetGeometryCollectionFromGeoJsonFeaturesProps

# Type Alias: GetGeometryCollectionFromGeoJsonFeaturesProps

> **GetGeometryCollectionFromGeoJsonFeaturesProps**: `object`

Defined in: [core/src/geometry/geojson-geometry.ts:28](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/geojson-geometry.ts#L28)

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
