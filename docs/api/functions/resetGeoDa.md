[geoda-wasm](../globals.md) / resetGeoDa

# Function: resetGeoDa()

> **resetGeoDa**(): `void`

Defined in: [src/init.ts:69](https://github.com/GeoDaCenter/geoda-lib/blob/92ce80b2e81e5a6276ad0890a9a8fe638734b201/src/js/src/init.ts#L69)

Reset the GeoDa WASM module.

When you want to reset the GeoDa WASM module, e.g. an unknown error occurs, you can use this function.

## Returns

`void`

## Example

```ts
import {resetWASM} from 'geoda-wasm';
resetWASM();
```
