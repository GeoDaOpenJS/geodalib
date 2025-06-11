[geodalib](../../../modules.md) / [core/src](../index.md) / getNearestNeighborsFromGeomCollection

# Function: getNearestNeighborsFromGeomCollection()

> **getNearestNeighborsFromGeomCollection**(`__namedParameters`): `Promise`\<`number`[][]\>

Defined in: [core/src/weights/nearest-neighbors.ts:51](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/weights/nearest-neighbors.ts#L51)

Calculates the nearest neighbors for a given set of geometries.

## Parameters

### \_\_namedParameters

#### geomCollection

[`GeometryCollection`](../classes/GeometryCollection.md)

The geometry collection to calculate the nearest neighbors for.

#### k

`number`

The number of nearest neighbors to calculate.

## Returns

`Promise`\<`number`[][]\>

- The nearest neighbors as an array of indices.
