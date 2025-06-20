[geodalib](../../../modules.md) / [core/src](../index.md) / getContiguityNeighborsFromBinaryGeometries

# Function: getContiguityNeighborsFromBinaryGeometries()

> **getContiguityNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [core/src/weights/contiguity-neighbors.ts:155](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/weights/contiguity-neighbors.ts#L155)

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
