[geodalib](../../../modules.md) / [core/src](../index.md) / spatialDissolve

# Function: spatialDissolve()

> **spatialDissolve**(`polys`): `Promise`\<\{ `dissolvedGroups`: `number`[][]; `dissolvedPolygons`: `Feature`\<`Geometry`, `GeoJsonProperties`\>[]; \}\>

Defined in: [core/src/geometry/spatial-dissolve.ts:20](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/spatial-dissolve.ts#L20)

Dissolve the polygons by merging them into a single polygon

## Parameters

### polys

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The polygons to dissolve

## Returns

`Promise`\<\{ `dissolvedGroups`: `number`[][]; `dissolvedPolygons`: `Feature`\<`Geometry`, `GeoJsonProperties`\>[]; \}\>

The dissolved polygon

## Example

```ts
const polys = [
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 1 } },
];
const { dissolvedPolygons, dissolvedGroups } = await spatialDissolve(polys);
```
