[geodalib](../../../modules.md) / [core/src](../index.md) / standardizeMAD

# Function: standardizeMAD()

> **standardizeMAD**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/data/mad.ts:19](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/data/mad.ts#L19)

Standardizes data using Mean Absolute Deviation (MAD) normalization.

For each valid data point, applies the transformation: (x - mean) / mad

## Parameters

### data

The numeric values to be standardized

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The standardized data using MAD normalization

## Example

```ts
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const standardized = await standardizeMAD(data);
console.log(standardized);
```
