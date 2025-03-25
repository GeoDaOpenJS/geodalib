[geoda-wasm](../globals.md) / createLineCollectionFromBinaryFeatures

# Function: createLineCollectionFromBinaryFeatures()

> **createLineCollectionFromBinaryFeatures**(`linesArray`, `wasm`): `LineCollection`

Defined in: [src/geometry/binary-geometry.ts:109](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/geometry/binary-geometry.ts#L109)

Creates a GeoDa LineCollection from binary line features

## Parameters

### linesArray

(`undefined` \| `BinaryLineFeature`)[]

Array of binary line features from GeoArrow chunks

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

The initialized GeoDa WASM module

## Returns

`LineCollection`

A GeoDa line collection
