[geodalib](../../../modules.md) / [core/src](../index.md) / getDistanceNeighborsFromBinaryGeometries

# Function: getDistanceNeighborsFromBinaryGeometries()

> **getDistanceNeighborsFromBinaryGeometries**(`input`): `Promise`\<`number`[][]\>

Defined in: [core/src/weights/distance-neighbors.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/weights/distance-neighbors.ts#L25)

Calculates the neighbors within a distance band for a given set of geometries or latitude/longitude arrays.

## Parameters

### input

`DistanceNeighborsFromBinaryGeometriesProps`

The input parameters.

## Returns

`Promise`\<`number`[][]\>

- The nearest neighbors as an array of indices.
