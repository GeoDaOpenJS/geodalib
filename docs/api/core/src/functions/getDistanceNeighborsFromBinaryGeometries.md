[geodalib](../../../modules.md) / [core/src](../index.md) / getDistanceNeighborsFromBinaryGeometries

# Function: getDistanceNeighborsFromBinaryGeometries()

> **getDistanceNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [core/src/weights/distance-neighbors.ts:24](https://github.com/GeoDaCenter/geoda-lib/blob/246bf05338fdf79294f778f8829940c18b17a0f8/js/packages/core/src/weights/distance-neighbors.ts#L24)

Calculates the neighbors within a distance band for a given set of geometries or latitude/longitude arrays.

## Parameters

### input

`DistanceNeighborsFromBinaryGeometriesProps`

The input parameters.

## Returns

`Promise`\<`number`[][]\>

- The nearest neighbors as an array of indices.
