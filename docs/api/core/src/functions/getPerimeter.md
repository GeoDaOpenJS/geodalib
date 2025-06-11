[geodalib](../../../modules.md) / [core/src](../index.md) / getPerimeter

# Function: getPerimeter()

> **getPerimeter**(`geoms`, `distanceUnit`): `Promise`\<`number`[]\>

Defined in: [core/src/geometry/attributes.ts:96](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/geometry/attributes.ts#L96)

Get the perimeter of the geometry

## Parameters

### geoms

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

### distanceUnit

`DistanceUnit`

## Returns

`Promise`\<`number`[]\>

## Example

```ts
const geoms = [
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
];
const perimeter = await getPerimeter(geoms, DistanceUnit.KM);
```
