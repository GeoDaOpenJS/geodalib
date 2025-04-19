[geodalib](../../../modules.md) / [core/src](../index.md) / polygonToFeature

# Function: polygonToFeature()

> **polygonToFeature**(`polygon`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

Defined in: [core/src/geometry/utils.ts:247](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/geometry/utils.ts#L247)

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
