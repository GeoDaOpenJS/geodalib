# Get Started

GeoDaLib is a modern javascript library for spatial data analysis. It is built based on the core C++ code of GeoDa software. The C++ code has been compiled into WebAssembly modules and a typescript library has been built as a wrapper for easy API usage.

## Installation

To install GeoDaLib javascript library:

::: code-group

```bash [npm]
npm install geoda-wasm
```

```bash [pnpm]
pnpm add geoda-wasm 
```

```bash [yarn]
yarn add geoda-wasm
```

:::

## Example

Here is a quick example of using GeoDaLib to apply Local Moran statistics on some example data:

```js
import {localMoran} from 'geoda-wasm';

// exmaple data
const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
const permutation = 99;

// call local moran
const result = await localMoran({data, neighbors, permutation});
```

## Bundle

The webassembly module of GeoDaLib will be loaded dynamically from https://cdn.jsdelivr.net/npm/geoda-wasm@latest/dist/geoda.wasm. For more details, please see the implementation of function [initWASM()](api/functions/initGeoDa).

If you want to bundle the WASM file manually, you can change the WASM location by calling function [setDeliveryWASM()](api/functions/setGeoDaDelivery).