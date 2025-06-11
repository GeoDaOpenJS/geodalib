[geodalib](../../../modules.md) / [core/src](../index.md) / getMinimumSpanningTree

# Function: getMinimumSpanningTree()

> **getMinimumSpanningTree**(`geoms`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

Defined in: [core/src/geometry/mst.ts:21](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/geometry/mst.ts#L21)

Get the Minimum Spanning Tree for the given geometries.

## Example
```ts
const geoms = [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 0] } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [0, 1] } },
];
const mst = await getMST({ geoms });
```

## Parameters

### geoms

The geometries to get the Minimum Spanning Tree for

#### geoms

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

## Returns

`Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

The Minimum Spanning Tree
