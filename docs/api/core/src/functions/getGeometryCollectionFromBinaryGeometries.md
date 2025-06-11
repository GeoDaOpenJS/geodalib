[geodalib](../../../modules.md) / [core/src](../index.md) / getGeometryCollectionFromBinaryGeometries

# Function: getGeometryCollectionFromBinaryGeometries()

> **getGeometryCollectionFromBinaryGeometries**(`geometryType`, `binaryFeaturesChunks`, `wasm`, `fixPolygon`?, `convertToUTM`?): `Promise`\<[`GeometryCollection`](../classes/GeometryCollection.md)\>

Defined in: [core/src/geometry/binary-geometry.ts:32](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/binary-geometry.ts#L32)

Creates a GeoDa GeometryCollection from binary geometry features

## Parameters

### geometryType

[`BinaryGeometryType`](../type-aliases/BinaryGeometryType.md)

The type of geometry to create

### binaryFeaturesChunks

`BinaryFeatureCollection`[]

Array of binary feature collections. See BinaryFeatureCollection in `@loaders.gl/schema`

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

### fixPolygon?

`boolean`

### convertToUTM?

`boolean`

## Returns

`Promise`\<[`GeometryCollection`](../classes/GeometryCollection.md)\>

A GeoDa geometry collection

## Throws

If WASM module is not initialized or geometry type is unknown
