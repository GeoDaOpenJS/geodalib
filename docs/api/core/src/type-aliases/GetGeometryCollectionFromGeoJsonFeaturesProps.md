[geodalib](../../../modules.md) / [core/src](../index.md) / GetGeometryCollectionFromGeoJsonFeaturesProps

# Type Alias: GetGeometryCollectionFromGeoJsonFeaturesProps

> **GetGeometryCollectionFromGeoJsonFeaturesProps**: `object`

Defined in: [core/src/geometry/geojson-geometry.ts:28](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/geojson-geometry.ts#L28)

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
