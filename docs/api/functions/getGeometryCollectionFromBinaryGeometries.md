[geoda-wasm](../globals.md) / getGeometryCollectionFromBinaryGeometries

# Function: getGeometryCollectionFromBinaryGeometries()

> **getGeometryCollectionFromBinaryGeometries**(`geometryType`, `binaryFeaturesChunks`, `wasm`): `Promise`\<`GeometryCollection`\>

Defined in: [src/geometry/binary-geometry.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/geometry/binary-geometry.ts#L25)

create geoda.GeometryCollection from dataToFeatures[] in GeojsonLayer

## Parameters

### geometryType

[`BinaryGeometryType`](../type-aliases/BinaryGeometryType.md)

### binaryFeaturesChunks

`BinaryFeatureCollection`[]

### wasm

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

## Returns

`Promise`\<`GeometryCollection`\>
