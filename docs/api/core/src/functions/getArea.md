[geodalib](../../../modules.md) / [core/src](../index.md) / getArea

# Function: getArea()

> **getArea**(`geoms`, `distanceUnit`): `Promise`\<`number`[]\>

Defined in: [core/src/geometry/attributes.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/attributes.ts#L25)

Get the area of the geometry

## Parameters

### geoms

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The geometry to get the area of

### distanceUnit

`DistanceUnit`

The unit of the distance

## Returns

`Promise`\<`number`[]\>

The area of the geometry

## Example

```ts
const geoms = [
  {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] },
    properties: { index: 0 },
  },
];
const area = await getArea(geoms, DistanceUnit.KM);
```
