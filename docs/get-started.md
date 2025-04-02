# Get Started

GeoDaLib comes packed with powerful spatial analysis tools into 4 packages:

- 📦 **@geoda/core**
  - 🗺️ Mapping
  - 📊 Data Exploration
  - ⚖️ Spatial Weights
  - ⚡ Spatial Operations
- 📦 **@geoda/lisa**
  - 📐 Spatial Autocorrelation Analysis
- 📦 **@geoda/regression**
  - 📈 Spatial Regression
- 📦 **@geoda/clustering**
  - 📍 Spatial Clustering

Each package works independently, so you can install only the packages you need.

## Installation

To install GeoDaLib javascript library:

::: code-group

```bash [npm]
npm install @geoda/core
```

```bash [pnpm]
pnpm add @geoda/core
```

```bash [yarn]
yarn add @geoda/core
```
:::

## Prerequisites

- Node.js (22.11.0 recommended)
- Yarn (4.0.0 recommended)


## Example

Here is a quick example of using GeoDaLib to apply Local Moran statistics on some example data:

```ts
import { localMoran } from '@geoda/lisa';

// exmaple data
const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
const permutation = 99;

// call local moran
const result = await localMoran({ data, neighbors, permutation });
```


