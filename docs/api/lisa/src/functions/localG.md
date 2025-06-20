[geodalib](../../../modules.md) / [lisa/src](../index.md) / localG

# Function: localG()

> **localG**(`__namedParameters`): `Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>

Defined in: [lisa/src/sa/local-g.ts:60](https://github.com/GeoDaCenter/geoda-lib/blob/04471ecd75dbfe13a0a0fbff4b6e7d785ad0f8e7/js/packages/lisa/src/sa/local-g.ts#L60)

Get local Getis-Ord statistics.

## Example
```ts
import { localG } from '@geoda/lisa';

const data = [1, 2, 3, 4, 5];
const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];

const result = await localG({
  data,
  neighbors,
});

console.log(result);
```

## Parameters

### \_\_namedParameters

[`LocalGProps`](../type-aliases/LocalGProps.md)

## Returns

`Promise`\<[`LocalMoranResult`](../type-aliases/LocalMoranResult.md)\>
