[geodalib](../../../modules.md) / [core/src](../index.md) / createPolygonCollectionFromBinaryFeatures

# Function: createPolygonCollectionFromBinaryFeatures()

> **createPolygonCollectionFromBinaryFeatures**(`polygonsArray`, `wasm`): `PolygonCollection`

Defined in: [core/src/geometry/binary-geometry.ts:164](https://github.com/GeoDaCenter/geoda-lib/blob/246bf05338fdf79294f778f8829940c18b17a0f8/js/packages/core/src/geometry/binary-geometry.ts#L164)

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
