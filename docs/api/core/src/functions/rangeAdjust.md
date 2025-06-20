[geodalib](../../../modules.md) / [core/src](../index.md) / rangeAdjust

# Function: rangeAdjust()

> **rangeAdjust**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/data/rangeAdjust.ts:19](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/core/src/data/rangeAdjust.ts#L19)

Adjusts the range of data to [0, 1] by subtracting the minimum value
and dividing by the range (max - min).

## Parameters

### data

The numeric values to be range adjusted

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The range adjusted data scaled to [0, 1]

## Example

```ts
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const adjusted = await rangeAdjust(data);
console.log(adjusted);
```
