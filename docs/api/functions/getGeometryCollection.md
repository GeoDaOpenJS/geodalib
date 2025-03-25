[geoda-wasm](../globals.md) / getGeometryCollection

# Function: getGeometryCollection()

> **getGeometryCollection**(`props`): `Promise`\<`GeometryCollection`\>

Defined in: [src/geometry/spatial-join.ts:226](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/geometry/spatial-join.ts#L226)

Get GeometryCollection from SpatialJoinGeometries

## Parameters

### props

the props for getGeometryCollection see GetGeometryCollectionProps

#### geometries

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

#### wasmInstance

[`GeoDaInterface`](../interfaces/GeoDaInterface.md)

## Returns

`Promise`\<`GeometryCollection`\>

GeometryCollection - the geometry collection see src/spatial_features.h
