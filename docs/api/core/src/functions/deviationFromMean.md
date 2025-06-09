[geodalib](../../../modules.md) / [core/src](../index.md) / deviationFromMean

# Function: deviationFromMean()

> **deviationFromMean**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/data/deviation.ts:20](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/data/deviation.ts#L20)

Calculate the deviation from the mean.

Note: The deviation from the mean is the difference between the mean and the data point.

## Parameters

### data

The data to calculate the deviation from the mean

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The deviation from the mean

## Example

```ts
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const deviation = await deviationFromMean(data);
console.log(deviation);
```
