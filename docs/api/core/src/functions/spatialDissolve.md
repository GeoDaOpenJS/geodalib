[geodalib](../../../modules.md) / [core/src](../index.md) / spatialDissolve

# Function: spatialDissolve()

> **spatialDissolve**(`polys`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

Defined in: [core/src/geometry/spatial-dissolve.ts:19](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/spatial-dissolve.ts#L19)

Dissolve the polygons by merging them into a single polygon

## Parameters

### polys

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The polygons to dissolve

## Returns

`Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

The dissolved polygon

## Example

```ts
const polys = [
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 1 } },
];
const dissolved = await spatialDissolve(polys);
```
