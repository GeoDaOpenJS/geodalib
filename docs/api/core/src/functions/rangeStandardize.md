[geodalib](../../../modules.md) / [core/src](../index.md) / rangeStandardize

# Function: rangeStandardize()

> **rangeStandardize**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/data/rangeStandardize.ts:19](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/data/rangeStandardize.ts#L19)

Standardizes the range of data to [0, 1] by subtracting the minimum value
and dividing by the range (max - min).

## Parameters

### data

The numeric values to be range standardized

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The range standardized data scaled to [0, 1]

## Example

```ts
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const standardized = await rangeStandardize(data);
console.log(standardized);
```
