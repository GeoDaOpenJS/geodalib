[geodalib](../../../modules.md) / [core/src](../index.md) / getLength

# Function: getLength()

> **getLength**(`geoms`, `distanceUnit`): `Promise`\<`number`[]\>

Defined in: [core/src/geometry/attributes.ts:61](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/attributes.ts#L61)

Get the length of the geometry

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
  { type: 'Feature', geometry: { type: 'LineString', coordinates: [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]] }, properties: { index: 0 } },
];
const length = await getLength(geoms, DistanceUnit.KM);
```
