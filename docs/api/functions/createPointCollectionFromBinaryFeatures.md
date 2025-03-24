[geoda-wasm](../globals.md) / createPointCollectionFromBinaryFeatures

# Function: createPointCollectionFromBinaryFeatures()

> **createPointCollectionFromBinaryFeatures**(`pointsArray`, `wasm`): `PointCollection`

Defined in: [src/geometry/binary-geometry.ts:52](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/geometry/binary-geometry.ts#L52)

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
