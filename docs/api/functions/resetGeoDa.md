[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / resetGeoDa

# Function: resetGeoDa()

> **resetGeoDa**(): `void`

Defined in: [src/init.ts:69](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/src/init.ts#L69)

Reset the GeoDa WASM module.

When you want to reset the GeoDa WASM module, e.g. an unknown error occurs, you can use this function.

## Returns

`void`

## Example

```ts
import {resetWASM} from 'geoda-wasm';
resetWASM();
```
