[geodalib](../../../modules.md) / [core/src](../index.md) / getGeometryCollectionFromBinaryGeometries

# Function: getGeometryCollectionFromBinaryGeometries()

> **getGeometryCollectionFromBinaryGeometries**(`geometryType`, `binaryFeaturesChunks`, `wasm`, `fixPolygon`?, `convertToUTM`?): `Promise`\<[`GeometryCollection`](../classes/GeometryCollection.md)\>

Defined in: [core/src/geometry/binary-geometry.ts:32](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/geometry/binary-geometry.ts#L32)

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
