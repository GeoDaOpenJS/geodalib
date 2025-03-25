[geoda-wasm](../globals.md) / createPointCollectionFromBinaryFeatures

# Function: createPointCollectionFromBinaryFeatures()

> **createPointCollectionFromBinaryFeatures**(`pointsArray`, `wasm`): `PointCollection`

Defined in: [src/geometry/binary-geometry.ts:60](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/geometry/binary-geometry.ts#L60)

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
