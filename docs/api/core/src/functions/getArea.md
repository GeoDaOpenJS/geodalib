[geodalib](../../../modules.md) / [core/src](../index.md) / getArea

# Function: getArea()

> **getArea**(`geoms`, `distanceUnit`): `Promise`\<`number`[]\>

Defined in: [core/src/geometry/attributes.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/attributes.ts#L25)

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
