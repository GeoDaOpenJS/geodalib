[geodalib](../../../modules.md) / [core/src](../index.md) / getGeometryCollection

# Function: getGeometryCollection()

> **getGeometryCollection**(`__namedParameters`): `Promise`\<[`GeometryCollection`](../classes/GeometryCollection.md)\>

Defined in: [core/src/geometry/utils.ts:189](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/geometry/utils.ts#L189)

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
