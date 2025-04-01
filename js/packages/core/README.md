# @geoda/core

A powerful JavaScript/TypeScript library for spatial data analysis and visualization.

## Features

### Mapping
- **Basic Mapping**
  - Quantile maps
  - Natural breaks (Jenks)
  - Equal intervals
  - Percentile maps
  - Box plots (hinge = 1.5 and 3.0)
  - Standard deviation maps

- **Rate Mapping**
  - Excess risk
  - Empirical Bayes
  - Spatial rate
  - Spatial empirical Bayes

- **Cartogram**

### Data Exploration
- Standardization
- MAD (Median Absolute Deviation)
- PCA (Principal Component Analysis)
- Diff-in-Diff analysis
- Spatial lagged variables

### Spatial Weights
- **Contiguity Weights**
  - Queen weights
  - Rook weights

- **Distance Weights**
  - Minimum distance threshold
  - K-Nearest neighbors
  - Distance-based weights

- **Kernel Weights**
  - Kernel weights
  - Kernel K-Nearest neighbors weights

### Spatial Operations
- **Geometric Operations**
  - Centroid calculation
  - Buffer creation
  - Convex hull
  - Spatial dissolve
  - Spatial join

- **Other Operations**
  - Voronoi diagrams

## Installation

```bash
yarn add @geoda/core
```

## Usage Examples

### Quantile Breaks Classification

```typescript
import { quantileBreaks } from '@geoda/core';

// Create classes with equal number of observations
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3; // number of classes
const breaks = await quantileBreaks(k, data);
// breaks = [3.5, 6.5]
```

## API Documentation

For detailed API documentation, please visit our [documentation site](https://geoda-lib.github.io/geoda-lib/).

## License

MIT License
