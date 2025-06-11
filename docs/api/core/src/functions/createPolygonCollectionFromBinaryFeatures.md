[geodalib](../../../modules.md) / [core/src](../index.md) / createPolygonCollectionFromBinaryFeatures

# Function: createPolygonCollectionFromBinaryFeatures()

> **createPolygonCollectionFromBinaryFeatures**(`polygonsArray`, `wasm`, `fixPolygon`?, `convertToUTM`?): `PolygonCollection`

Defined in: [core/src/geometry/binary-geometry.ts:166](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/geometry/binary-geometry.ts#L166)

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
