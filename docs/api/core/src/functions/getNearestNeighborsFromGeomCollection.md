[geodalib](../../../modules.md) / [core/src](../index.md) / getNearestNeighborsFromGeomCollection

# Function: getNearestNeighborsFromGeomCollection()

> **getNearestNeighborsFromGeomCollection**(`__namedParameters`): `Promise`\<`number`[][]\>

Defined in: [core/src/weights/nearest-neighbors.ts:70](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/weights/nearest-neighbors.ts#L70)

Calculates the nearest neighbors for a given set of geometries.

## Example
```ts
import { getNearestNeighborsFromGeomCollection } from '@geoda/core';

const geometries = [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
];

const neighbors = await getNearestNeighborsFromGeomCollection({
  k: 2,
  geomCollection: geometries,
});

console.log(neighbors);
```

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
