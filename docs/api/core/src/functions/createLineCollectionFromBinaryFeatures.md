[geodalib](../../../modules.md) / [core/src](../index.md) / createLineCollectionFromBinaryFeatures

# Function: createLineCollectionFromBinaryFeatures()

> **createLineCollectionFromBinaryFeatures**(`linesArray`, `wasm`): `LineCollection`

Defined in: [core/src/geometry/binary-geometry.ts:109](https://github.com/GeoDaCenter/geoda-lib/blob/246bf05338fdf79294f778f8829940c18b17a0f8/js/packages/core/src/geometry/binary-geometry.ts#L109)

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
