[geoda-wasm](../globals.md) / getContiguityNeighborsFromBinaryGeometries

# Function: getContiguityNeighborsFromBinaryGeometries()

> **getContiguityNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [src/weights/contiguity-neighbors.ts:27](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/weights/contiguity-neighbors.ts#L27)

Calculates the nearest neighbors for a given set of geometries or latitude/longitude arrays.

## Parameters

### input

`ContiguityNeighborsFromBinaryGeometriesProps`

The input parameters.

## Returns

`Promise`\<`number`[][]\>

- The nearest neighbors as an array of indices.
