[geodalib](../../../modules.md) / [core/src](../index.md) / getCentroids

# Function: getCentroids()

> **getCentroids**(`geoms`): `Promise`\<(`null` \| `number`[])[]\>

Defined in: [core/src/geometry/centroid.ts:22](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/geometry/centroid.ts#L22)

Get the centroids of the geometries

## Example
```ts
const geoms = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [100, 0] },
  },
];

const centroids = await getCentroids(geoms);
```

## Parameters

### geoms

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The geometries to get the centroids. See [SpatialGeometry](../type-aliases/SpatialGeometry.md)

## Returns

`Promise`\<(`null` \| `number`[])[]\>

The centroids of the geometries
