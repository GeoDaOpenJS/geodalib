[geodalib](../../../modules.md) / [core/src](../index.md) / getThiessenPolygons

# Function: getThiessenPolygons()

> **getThiessenPolygons**(`geoms`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

Defined in: [core/src/geometry/thiessen-polygon.ts:25](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/thiessen-polygon.ts#L25)

Get the Thiessen polygons for the given geometries. If the given geometries are not points,
the centroids will be used to create the Thiessen polygons.

Note: The Thiessen polygons are the polygons that are created by the Voronoi diagram of the points.

## Example
```ts
const geoms = [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4194, 37.7749] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-74.0060, 40.7128] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-87.6298, 41.8781] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-95.3698, 29.7604] } },
];
const thiessenPolygons = await getThiessenPolygons({ geoms });
```

## Parameters

### geoms

The geometries to get the Thiessen polygons

#### geoms

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

## Returns

`Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

The Thiessen polygons
