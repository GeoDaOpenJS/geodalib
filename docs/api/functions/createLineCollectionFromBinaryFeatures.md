[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / createLineCollectionFromBinaryFeatures

# Function: createLineCollectionFromBinaryFeatures()

> **createLineCollectionFromBinaryFeatures**(`linesArray`, `wasm`): `LineCollection`

Defined in: [src/geometry/binary-geometry.ts:100](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/geometry/binary-geometry.ts#L100)

create geoda lineCollection from dataToFeatures[] in GeojsonLayer

## Parameters

### linesArray

(`undefined` \| `BinaryLineFeature`)[]

BinaryFeatureCollection['lines'][] An array of binary line features from chunks of geoarrow

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

## Returns

`LineCollection`

LineCollection | null
