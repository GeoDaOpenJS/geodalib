[geodalib](../../../modules.md) / [core/src](../index.md) / getMinimumSpanningTree

# Function: getMinimumSpanningTree()

> **getMinimumSpanningTree**(`geoms`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

Defined in: [core/src/geometry/mst.ts:23](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/mst.ts#L23)

Get the Minimum Spanning Tree for the given geometries. The Minimum Spanning Tree is a tree that connects all the geometries with the minimum total weight.
For more information, see [Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree).

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
