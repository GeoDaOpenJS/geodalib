[geoda-wasm](../globals.md) / getContiguityNeighborsFromBinaryGeometries

# Function: getContiguityNeighborsFromBinaryGeometries()

> **getContiguityNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [src/weights/contiguity-neighbors.ts:94](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/weights/contiguity-neighbors.ts#L94)

Calculates contiguity-based neighbors for a set of binary geometries.

This function processes binary geometry features to determine spatial relationships
between geometries based on their contiguity (shared boundaries or vertices).

## Parameters

### input

[`ContiguityNeighborsFromBinaryGeometriesProps`](../type-aliases/ContiguityNeighborsFromBinaryGeometriesProps.md)

Configuration object for neighbor calculation

## Returns

`Promise`\<`number`[][]\>

Array where each element contains indices of neighboring geometries
