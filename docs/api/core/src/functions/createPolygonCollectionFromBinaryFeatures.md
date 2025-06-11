[geodalib](../../../modules.md) / [core/src](../index.md) / createPolygonCollectionFromBinaryFeatures

# Function: createPolygonCollectionFromBinaryFeatures()

> **createPolygonCollectionFromBinaryFeatures**(`polygonsArray`, `wasm`, `fixPolygon`?, `convertToUTM`?): `PolygonCollection`

Defined in: [core/src/geometry/binary-geometry.ts:166](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/binary-geometry.ts#L166)

Creates a GeoDa PolygonCollection from binary polygon features

## Parameters

### polygonsArray

(`undefined` \| `BinaryPolygonFeature`)[]

Array of binary polygon features from GeoArrow chunks

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

### fixPolygon?

`boolean`

### convertToUTM?

`boolean`

## Returns

`PolygonCollection`

A GeoDa polygon collection
