[geoda-wasm](../globals.md) / createPolygonCollectionFromBinaryFeatures

# Function: createPolygonCollectionFromBinaryFeatures()

> **createPolygonCollectionFromBinaryFeatures**(`polygonsArray`, `wasm`): `PolygonCollection`

Defined in: [src/geometry/binary-geometry.ts:154](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/geometry/binary-geometry.ts#L154)

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
