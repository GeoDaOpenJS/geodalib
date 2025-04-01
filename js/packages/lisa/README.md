# @geoda/lisa

Local Indicators of Spatial Association (LISA) module for GeoDaLib. This package provides implementations of various spatial autocorrelation analysis methods, including both global and local indicators.

## Features

### Global Spatial Autocorrelation

- Moran's I: Measures global spatial autocorrelation

### Local Spatial Autocorrelation

- Local Moran's I
- Local Getis-Ord Gi\*
- Local Geary's C
- Local Join Count
- Quantile LISA

## Installation

```bash
yarn add @geoda/lisa
```

## Usage Examples

```typescript
import { localMoran, bivariateLocalMoran } from '@geoda/lisa';

// Example 1: Univariate Local Moran's I
const result = await localMoran({
  data: [1.2, 2.3, 3.4, 4.5], // Your data array
  neighbors: [[1], [0, 2], [1, 3], [2]], // Adjacency list
  permutation: 999, // Number of permutations for significance testing
  significanceCutoff: 0.05, // Optional: statistical significance threshold
  seed: 1234567890 // Optional: random seed for reproducibility
});

// The result includes:
console.log(result.isValid); // Whether the analysis was successful
console.log(result.clusters); // Cluster assignments
console.log(result.lagValues); // Spatially lagged values
console.log(result.pValues); // Statistical significance values
console.log(result.lisaValues); // Local Moran's I statistics
console.log(result.sigCategories); // Significance categories
console.log(result.nn); // Number of neighbors
console.log(result.labels); // Descriptive labels for clusters
console.log(result.colors); // Color codes for visualization

// Example 2: Bivariate Local Moran's I
const bivariateResult = await bivariateLocalMoran({
  data1: [1.2, 2.3, 3.4, 4.5], // First variable
  data2: [2.1, 3.2, 4.3, 5.4], // Second variable
  neighbors: [[1], [0, 2], [1, 3], [2]], // Adjacency list
  permutation: 999,
  significanceCutoff: 0.05,
  seed: 1234567890
});
```

## API Reference

For detailed API documentation, please refer to the [Spatial Autocorrelation Analysis](/docs/reference/spatial-autocorrelation-analysis) documentation.

## License

MIT
