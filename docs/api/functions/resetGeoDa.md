[geoda-wasm](../globals.md) / resetGeoDa

# Function: resetGeoDa()

> **resetGeoDa**(): `void`

Defined in: [src/init.ts:69](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/init.ts#L69)

Reset the GeoDa WASM module.

When you want to reset the GeoDa WASM module, e.g. an unknown error occurs, you can use this function.

## Returns

`void`

## Example

```ts
import {resetWASM} from 'geoda-wasm';
resetWASM();
```
