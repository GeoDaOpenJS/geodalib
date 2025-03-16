[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / getContiguityNeighborsFromBinaryGeometries

# Function: getContiguityNeighborsFromBinaryGeometries()

> **getContiguityNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [src/weights/contiguity-neighbors.ts:27](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/weights/contiguity-neighbors.ts#L27)

Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.

## Parameters

### input

`ContiguityNeighborsFromBinaryGeometriesProps`

The input parameters.

## Returns

`Promise`\<`number`[][]\>

- The nearest neighbors as an array of indices.
