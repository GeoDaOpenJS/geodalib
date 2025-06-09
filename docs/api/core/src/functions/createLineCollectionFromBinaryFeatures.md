[geodalib](../../../modules.md) / [core/src](../index.md) / createLineCollectionFromBinaryFeatures

# Function: createLineCollectionFromBinaryFeatures()

> **createLineCollectionFromBinaryFeatures**(`linesArray`, `wasm`, `convertToUTM`?): `LineCollection`

Defined in: [core/src/geometry/binary-geometry.ts:111](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/binary-geometry.ts#L111)

Creates a GeoDa LineCollection from binary line features

## Parameters

### linesArray

(`undefined` \| `BinaryLineFeature`)[]

Array of binary line features from GeoArrow chunks

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

### convertToUTM?

`boolean`

## Returns

`LineCollection`

A GeoDa line collection
