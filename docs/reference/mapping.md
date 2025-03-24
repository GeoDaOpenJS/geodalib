---
outline: deep
---

# Mapping

This documentation covers the standard map classification methods used in spatial data analysis. Each method provides different approaches to creating choropleth maps by determining breakpoints in the data distribution.

## Classification Methods

### 1. Quantile Map
- **Description**: Creates classes with equal number of observations
- **Characteristics**:
  - Sorts values in ascending order
  - Divides sorted values into bins with equal number of observations
  - Well-suited for ordinal data
  - May place similar values in different classes
  - Useful for comparing relative rankings across different areas

See [quantileBreaks()](/api/functions/quantileBreaks).

```ts
import { quantileBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await quantileBreaks(k, data);

// breaks = [3.5, 6.5]
```

### 2. Natural Breaks (Jenks)
- **Description**: Optimizes class breaks by minimizing within-class variance and maximizing between-class variance
- **Characteristics**:
  - Based on natural groupings inherent in the data
  - Similar values are grouped together
  - Boundaries are set where there are relatively big jumps in data values
  - Best for data with clear "breaks" in distribution

See [naturalBreaks()](/api/functions/naturalBreaks).

```ts
import { naturalBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await naturalBreaks(k, data);

// breaks = [4, 7]
```

### 3. Equal Intervals
- **Description**: Divides the range of values into equal-sized intervals
- **Characteristics**:
  - Simple to understand and interpret
  - Best for evenly distributed data
  - May not represent data well when distribution is skewed
  - Interval size = (maximum value - minimum value) / number of classes

See [equalIntervalBreaks()](/api/functions/equalIntervalBreaks).

```ts
import { equalIntervalBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const k = 3;
const breaks = await equalIntervalBreaks(k, data);

// breaks = [3.66666666666667, 6.33333333333333]
```

### 4. Percentile Map
- **Description**: Highlights extreme values in the distribution
- **Fixed Categories**:
  - Bottom 1%
  - 1-10%
  - 10-50%
  - 50-90%
  - 90-99%
  - Top 1%
- **Use Case**: Effective for identifying spatial outliers and extreme values

See [percentileBreaks()](/api/functions/percentileBreaks).

```ts
import { percentileBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await percentileBreaks(data);

// breaks = [1, 1.4, 5, 8.6, 9]
```

### 5. Box Map
- **Description**: Based on the box plot visualization concept
- **Two Variants**:
  - Hinge = 1.5 (standard box map)
  - Hinge = 3.0 (relaxed box map)
- **Categories**:
  - Lower outliers
  - Lower 25%
  - 25%-50%
  - 50%-75%
  - Upper 25%
  - Upper outliers
- **Use Case**: Good for detecting spatial outliers and understanding data distribution

See [hinge15Breaks()](/api/functions/hinge15Breaks) and [hinge30Breaks()](/api/functions/hinge30Breaks).

```ts
import { hinge15Breaks, hinge30Breaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const breaks1 = await hinge15Breaks(data);
const breaks2 = await hinge30Breaks(data);

// breaks1 = [-4, 2.75, 5, 7.25, 14]
// breaks2 = [-10.75, 2.75, 5, 7.25, 20.75]
```

### 6. Standard Deviation Map
- **Description**: Classes based on distance from the mean in standard deviation units
- **Characteristics**:
  - Centers on the mean value
  - Classes represent standard deviation intervals
  - Most appropriate for normally distributed data
  - Helps identify areas that deviate significantly from the mean

See [standardDeviationBreaks()](/api/functions/standardDeviationBreaks).

```ts
import { standardDeviationBreaks } from 'geoda-wasm';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const breaks = await standardDeviationBreaks(data);

// breaks = [-0.47722557505166, 2.26138721247417, 5, 7.73861278752583, 10.47722557505166]
```

## Notes
- The choice of classification method can significantly impact the visual interpretation of spatial patterns
- Consider your data distribution and analysis objectives when selecting a method
- Different methods may reveal different aspects of the spatial distribution

For detailed methodology and examples, refer to the [GeoDa Workbook](http://geodacenter.github.io/workbook/6a_local_auto/lab6a.html).
