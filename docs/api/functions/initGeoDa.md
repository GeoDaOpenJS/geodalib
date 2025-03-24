[geoda-wasm](../globals.md) / initGeoDa

# Function: initGeoDa()

> **initGeoDa**(`publicWASMUrl`?): `Promise`\<[`GeoDaInterface`](../interfaces/GeoDaInterface.md)\>

Defined in: [src/init.ts:45](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/init.ts#L45)

Initialize the GeoDa WASM module.

## Parameters

### publicWASMUrl?

`string`

## Returns

`Promise`\<[`GeoDaInterface`](../interfaces/GeoDaInterface.md)\>

The GeoDa WASM module

## Examples

```ts
import {initWASM} from 'geoda-wasm';
const geoda = await initWASM();
```

```ts
import {initWASM, getDeliveryWASM} from 'geoda-wasm';
const geoda = await initWASM(getDeliveryWASM());
```
