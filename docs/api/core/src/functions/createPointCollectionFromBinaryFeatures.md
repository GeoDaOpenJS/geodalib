[geodalib](../../../modules.md) / [core/src](../index.md) / createPointCollectionFromBinaryFeatures

# Function: createPointCollectionFromBinaryFeatures()

> **createPointCollectionFromBinaryFeatures**(`pointsArray`, `wasm`, `convertToUTM`?): `PointCollection`

Defined in: [core/src/geometry/binary-geometry.ts:62](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/binary-geometry.ts#L62)

Creates a GeoDa PointCollection from binary point features

## Parameters

### pointsArray

(`undefined` \| `BinaryPointFeature`)[]

Array of binary point features from GeoArrow chunks

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

### convertToUTM?

`boolean`

## Returns

`PointCollection`

A GeoDa point collection
