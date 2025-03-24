# GeoDa WASM

GeoDa WASM is a WebAssembly module that provides spatial data analysis capabilities from the GeoDa C++ library for use in web browsers and Node.js applications.

## ✨ Features

- 🗺️ **Spatial Data Analysis Tools**: Dive into a world of spatial insights.
- 📐 **Support for Various Geometry Types**: Points, Lines, Polygons - we've got you covered!
- 🔄 **Spatial Weights Calculations**: Calculate with precision.
- 📊 **Local Spatial Autocorrelation Statistics (LISA)**: Discover patterns like never before.
- 📈 **Spatial Regression Analysis**: Uncover relationships in your data.
- 🗺️ **Mapping and Classification Methods**: Visualize your data beautifully.

## 🚀 Installation

Get started in a flash with your favorite package manager:

```bash
npm install geoda-wasm
```

or

```bash
yarn add geoda-wasm
```

## 🛠️ Usage

### 🔧 Basic Initialization

```ts
typescript
import {initGeoDa} from 'geoda-wasm';
// Initialize using CDN-hosted WASM file
const geoda = await initGeoDa();
```

### 🏗️ Working with Geometries

The library supports three main geometry types:
- Points
- Lines
- Polygons

You can create geometry collections from various data formats:
- GeoJSON
- Binary Features (Arrow format)
- Point Layer Data

```typescript
import {
createPointCollectionFromBinaryFeatures,
createLineCollectionFromBinaryFeatures,
createPolygonCollectionFromBinaryFeatures
} from 'geoda-wasm';
// Example with point data
const pointCollection = createPointCollectionFromBinaryFeatures(pointsArray, geoda);
```

## 🏗️ Building from Source

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

## 📜 License

This project is licensed under the MIT License. Authors: Luc Anselin and Xun Li.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
