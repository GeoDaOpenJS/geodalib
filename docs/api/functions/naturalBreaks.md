[geoda-wasm](../globals.md) / naturalBreaks

# Function: naturalBreaks()

> **naturalBreaks**(`k`, `data`): `Promise`\<`number`[]\>

Defined in: [src/mapping/natural-breaks.ts:31](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/mapping/natural-breaks.ts#L31)

## Description
The natural breaks (Jenks) algorithm breaks up the data into k classes by minimizing within-class variance 
and maximizing between-class variance. The values in each group are as similar as possible to each other, 
and as different as possible from the values in the other groups.

## Characteristics
- Based on natural groupings inherent in the data
- Similar values are grouped together
- Boundaries are set where there are relatively big jumps in data values
- Best for data with clear "breaks" in distribution

## Parameters

### k

`number`

The number of classes/categories

### data

The numeric values to be classified

`number`[] | `Float32Array`\<`ArrayBuffer`\>

## Returns

`Promise`\<`number`[]\>

The breaks values

## Example

```ts
import { naturalBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await naturalBreaks(k, data);

// breaks = [4, 7]
```
