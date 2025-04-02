# GeoDa WASM

GeoDa WASM is a WebAssembly module that provides spatial data analysis capabilities from the GeoDa C++ library for use in web browsers and Node.js applications.

## ✨ Features

- 🗺️ Mapping
- 📊 Data Exploration
- ⚖️ Spatial Weights
- 📐 Spatial Autocorrelation Analysis
- 📍 Spatial Clustering
- 📈 Spatial Regression
- ⚡ Spatial Operations

Dive deeper in our [API Overview](https://geodacenter.github.io/geoda-lib/api-overview)!

## 🚀 Installation

Get started in a flash with your favorite package manager:

```bash
npm install geoda-wasm
```

## 🛠️ Example

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

## 🏗️ Development

### 📋 Prerequisites

- CMake (3.5 or higher)
- Emscripten
- Node.js (18.19.0 recommended)
- Yarn (4.0.0 recommended)

### 🛠️ Build Steps

1. Clone the repository
2. Build the WASM module:

```bash
cd src/js
yarn install
yarn wasm
```

3. Build the JavaScript wrapper:

```bash
yarn build
```

```bash
cd src/js
yarn test
```

* NOTE for release

- DCMAKE_BUILD_TYPE=Release
- set(CMAKE_CXX_FLAGS "-O3 -DNDEBUG -s ASSERTIONS=0")

## 📜 License

This project is licensed under the MIT License. Authors: Luc Anselin and Xun Li.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
