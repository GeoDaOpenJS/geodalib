[geodalib](../../../modules.md) / [core/src](../index.md) / getContiguityNeighborsFromGeomCollection

# Function: getContiguityNeighborsFromGeomCollection()

> **getContiguityNeighborsFromGeomCollection**(`input`): `Promise`\<`number`[][]\>

Defined in: [core/src/weights/contiguity-neighbors.ts:124](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/weights/contiguity-neighbors.ts#L124)

Calculates contiguity-based neighbors for a set of geometries.

This function processes geometries to determine spatial relationships
between them based on their contiguity (shared boundaries or vertices).

## Parameters

### input

[`ContiguityNeighborsFromGeomCollectionProps`](../type-aliases/ContiguityNeighborsFromGeomCollectionProps.md)

Configuration object for neighbor calculation See [ContiguityNeighborsFromGeomCollectionProps](../type-aliases/ContiguityNeighborsFromGeomCollectionProps.md) for more information.

## Returns

`Promise`\<`number`[][]\>

Array where each element contains indices of neighboring geometries
