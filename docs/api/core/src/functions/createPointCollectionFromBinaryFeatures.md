[geodalib](../../../modules.md) / [core/src](../index.md) / createPointCollectionFromBinaryFeatures

# Function: createPointCollectionFromBinaryFeatures()

> **createPointCollectionFromBinaryFeatures**(`pointsArray`, `wasm`): `PointCollection`

Defined in: [core/src/geometry/binary-geometry.ts:60](https://github.com/GeoDaCenter/geoda-lib/blob/5c8fba7800a0ff8c8ed4b8b260cc40d1229fb38a/js/packages/core/src/geometry/binary-geometry.ts#L60)

Creates a GeoDa PointCollection from binary point features

## Parameters

### pointsArray

(`undefined` \| `BinaryPointFeature`)[]

Array of binary point features from GeoArrow chunks

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

## Returns

`PointCollection`

A GeoDa point collection
