[geodalib](../../../modules.md) / [core/src](../index.md) / getGeometryCollection

# Function: getGeometryCollection()

> **getGeometryCollection**(`__namedParameters`): `Promise`\<[`GeometryCollection`](../classes/GeometryCollection.md)\>

Defined in: [core/src/geometry/utils.ts:198](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/utils.ts#L198)

Get GeometryCollection from input geometries. The input geometries can be
1. GeoJSON features
2. binary feature collections
3. point layer data
4. arc layer data
5. hexagon id layer data

## Parameters

### \_\_namedParameters

#### convertToUTM?

`boolean` = `false`

convert to UTM

#### fixPolygon?

`boolean` = `true`

fix polygon

#### geometries

[`SpatialGeometry`](../type-aliases/SpatialGeometry.md)

input geometries see [SpatialGeometry](../type-aliases/SpatialGeometry.md)

## Returns

`Promise`\<[`GeometryCollection`](../classes/GeometryCollection.md)\>

GeometryCollection - the geometry collection used in GeoDaLib see src/spatial_features.h

## Example

```ts
const geoms = [
  { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, properties: { index: 0 } },
];
const geometryCollection = await getGeometryCollection({ geometries: geoms });
```
