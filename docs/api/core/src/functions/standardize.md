[geodalib](../../../modules.md) / [core/src](../index.md) / standardize

# Function: standardize()

> **standardize**(`data`): `Promise`\<`number`[]\>

Defined in: [core/src/data/standardize.ts:19](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/data/standardize.ts#L19)

Standardizes data using z-score normalization.
For each valid data point, applies the transformation: (x - mean) / stddev

## Parameters

### data

The numeric values to be standardized

`number`[] | `Float32Array`\<`ArrayBufferLike`\>

## Returns

`Promise`\<`number`[]\>

The standardized data using z-score normalization

## Example

```ts
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const standardized = await standardize(data);
console.log(standardized);
```
