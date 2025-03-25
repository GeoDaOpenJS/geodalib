[geoda-wasm](../globals.md) / createPolygonCollectionFromBinaryFeatures

# Function: createPolygonCollectionFromBinaryFeatures()

> **createPolygonCollectionFromBinaryFeatures**(`polygonsArray`, `wasm`): `PolygonCollection`

Defined in: [src/geometry/binary-geometry.ts:164](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/geometry/binary-geometry.ts#L164)

Creates a GeoDa PolygonCollection from binary polygon features

## Parameters

### polygonsArray

(`undefined` \| `BinaryPolygonFeature`)[]

Array of binary polygon features from GeoArrow chunks

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

## Returns

`PolygonCollection`

A GeoDa polygon collection
