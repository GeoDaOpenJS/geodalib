[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / createPolygonCollectionFromBinaryFeatures

# Function: createPolygonCollectionFromBinaryFeatures()

> **createPolygonCollectionFromBinaryFeatures**(`polygonsArray`, `wasm`): `PolygonCollection`

Defined in: [src/geometry/binary-geometry.ts:154](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/geometry/binary-geometry.ts#L154)

create geoda polygonCollection from dataToFeatures[] in GeojsonLayer

## Parameters

### polygonsArray

(`undefined` \| `BinaryPolygonFeature`)[]

BinaryFeatureCollection['polygons'][] An array of binary polygon features from chunks of geoarrow

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

## Returns

`PolygonCollection`

PolygonCollection | null
