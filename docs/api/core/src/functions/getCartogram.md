[geodalib](../../../modules.md) / [core/src](../index.md) / getCartogram

# Function: getCartogram()

> **getCartogram**(`geoms`, `values`, `iterations`, `numberOfPointsPerCircle`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

Defined in: [core/src/geometry/cartogram.ts:28](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/geometry/cartogram.ts#L28)

Get a cartogram of the given geometries and values. The cartogram is a set of buffers around the given geometries.
The radius of the buffers is proportional to the values.

## Example
```ts
const geoms = [
  { type: 'Point', coordinates: [0, 0] },
  { type: 'Point', coordinates: [1, 1] },
];

const values = [1, 2];

const cartogram = await getCartogram(geoms, values);

console.log(cartogram);
```

## Parameters

### geoms

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

The geometries to get the cartogram of

### values

`number`[]

The values to use for the cartogram

### iterations

`number` = `100`

The number of iterations to run the cartogram algorithm

### numberOfPointsPerCircle

`number` = `30`

The number of points per circle. This is used to control the granularity of the buffers.

## Returns

`Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

The cartogram as a GeoJSON FeatureCollection
