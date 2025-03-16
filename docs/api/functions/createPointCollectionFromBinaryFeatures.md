[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / createPointCollectionFromBinaryFeatures

# Function: createPointCollectionFromBinaryFeatures()

> **createPointCollectionFromBinaryFeatures**(`pointsArray`, `wasm`): `PointCollection`

Defined in: [src/geometry/binary-geometry.ts:52](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/geometry/binary-geometry.ts#L52)

create geoda pointCollection from dataToFeatures[] in GeojsonLayer

## Parameters

### pointsArray

(`undefined` \| `BinaryPointFeature`)[]

BinaryFeatureCollection['points'] An array of binary point features from chunks of geoarrow

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

## Returns

`PointCollection`

pointCollection | null
