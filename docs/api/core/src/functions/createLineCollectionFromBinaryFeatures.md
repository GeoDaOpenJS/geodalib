[geodalib](../../../modules.md) / [core/src](../index.md) / createLineCollectionFromBinaryFeatures

# Function: createLineCollectionFromBinaryFeatures()

> **createLineCollectionFromBinaryFeatures**(`linesArray`, `wasm`, `convertToUTM`?): `LineCollection`

Defined in: [core/src/geometry/binary-geometry.ts:111](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/binary-geometry.ts#L111)

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
