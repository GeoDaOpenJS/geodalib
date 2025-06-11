[geodalib](../../../modules.md) / [core/src](../index.md) / WeightsMeta

# Type Alias: WeightsMeta

> **WeightsMeta**: `object`

Defined in: [core/src/weights/weights-stats.ts:4](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/weights/weights-stats.ts#L4)

The meta data for the weights

## Type declaration

### distanceMetric?

> `optional` **distanceMetric**: `"euclidean"` \| `"manhattan"` \| `"arc"` \| `"projected"`

The distance metric for the weights

### distanceUnit?

> `optional` **distanceUnit**: `"Foot_US"` \| `"Yard_US"` \| `"Meter"` \| `"Kilometer"` \| `"NauticalMile"` \| `"Degree"` \| `"Radian"`

The unit of the distance metric

### id?

> `optional` **id**: `string`

The id of the weights

### includeLowerOrder?

> `optional` **includeLowerOrder**: `boolean`

Whether to include lower order neighbors

### isMile?

> `optional` **isMile**: `boolean`

Whether the distance is in miles

### k?

> `optional` **k**: `number`

The k value for k-nearest neighbors

### maxNeighbors

> **maxNeighbors**: `number`

The maximum number of neighbors

### meanNeighbors

> **meanNeighbors**: `number`

The mean number of neighbors

### medianNeighbors

> **medianNeighbors**: `number`

The median number of neighbors

### minNeighbors

> **minNeighbors**: `number`

The minimum number of neighbors

### numberOfObservations

> **numberOfObservations**: `number`

The number of observations

### order?

> `optional` **order**: `number`

The order of the weights

### pctNoneZero

> **pctNoneZero**: `number`

The percentage of non-zero neighbors

### symmetry?

> `optional` **symmetry**: `"symmetric"` \| `"asymmetric"`

The symmetry of the weights

### threshold?

> `optional` **threshold**: `number`

The threshold for the weights

### type?

> `optional` **type**: `"knn"` \| `"threshold"` \| `"queen"` \| `"rook"`

The type of the weights
