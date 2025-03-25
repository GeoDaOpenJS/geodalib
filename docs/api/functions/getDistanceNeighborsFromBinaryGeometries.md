[geoda-wasm](../globals.md) / getDistanceNeighborsFromBinaryGeometries

# Function: getDistanceNeighborsFromBinaryGeometries()

> **getDistanceNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [src/weights/distance-neighbors.ts:24](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/weights/distance-neighbors.ts#L24)

Calculates the neighbors within a distance band for a given set of geometries or latitude/longitude arrays.

## Parameters

### input

`DistanceNeighborsFromBinaryGeometriesProps`

The input parameters.

## Returns

`Promise`\<`number`[][]\>

- The nearest neighbors as an array of indices.
