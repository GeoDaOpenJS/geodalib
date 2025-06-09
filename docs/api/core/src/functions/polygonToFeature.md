[geodalib](../../../modules.md) / [core/src](../index.md) / polygonToFeature

# Function: polygonToFeature()

> **polygonToFeature**(`polygon`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

Defined in: [core/src/geometry/utils.ts:263](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/utils.ts#L263)

Convert a Polygon to a GeoJSON Feature

## Parameters

### polygon

`Polygon`

The polygon to convert

## Returns

`Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

The converted GeoJSON Feature

## Example

```ts
const polygon = new Polygon(new VectorDouble([0, 0, 1, 0, 1, 1, 0, 1, 0, 0]), new VectorUInt([0, 1, 2, 3, 4]), new VectorUInt([0, 1, 2, 3, 4]), new VectorUInt([0, 1, 2, 3, 4]), true, false);
const feature = await polygonToFeature(polygon);
```
