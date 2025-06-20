[geodalib](../../../modules.md) / [core/src](../index.md) / spatialDissolve

# Function: spatialDissolve()

> **spatialDissolve**(`polys`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

Defined in: [core/src/geometry/spatial-dissolve.ts:24](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/spatial-dissolve.ts#L24)

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
const dissolvedPolygon = await spatialDissolve(polys);
```

:::tip
In practice, you may need to find the polygons that need to be dissolved first.
For example, using a county dataset, you may need to dissolve the polygons that share the same county code.
:::
