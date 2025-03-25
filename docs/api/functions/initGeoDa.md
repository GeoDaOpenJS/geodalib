[geoda-wasm](../globals.md) / initGeoDa

# Function: initGeoDa()

> **initGeoDa**(`publicWASMUrl`?): `Promise`\<[`GeoDaInterface`](../interfaces/GeoDaInterface.md)\>

Defined in: [src/init.ts:45](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/init.ts#L45)

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
