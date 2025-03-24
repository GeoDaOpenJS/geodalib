[geoda-wasm](../globals.md) / createLineCollectionFromBinaryFeatures

# Function: createLineCollectionFromBinaryFeatures()

> **createLineCollectionFromBinaryFeatures**(`linesArray`, `wasm`): `LineCollection`

Defined in: [src/geometry/binary-geometry.ts:100](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/geometry/binary-geometry.ts#L100)

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
