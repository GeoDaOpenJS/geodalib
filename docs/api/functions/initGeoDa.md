[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / initGeoDa

# Function: initGeoDa()

> **initGeoDa**(`publicWASMUrl`?): `Promise`\<[`GeoDaInterface`](../interfaces/GeoDaInterface.md)\>

Defined in: [src/init.ts:45](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/init.ts#L45)

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
