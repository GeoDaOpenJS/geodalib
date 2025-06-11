[geodalib](../../../modules.md) / [core/src](../index.md) / GetBuffersOptions

# Type Alias: GetBuffersOptions

> **GetBuffersOptions**: `object`

Defined in: [core/src/geometry/buffer.ts:9](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/geometry/buffer.ts#L9)

The options for getting the buffers

## Type declaration

### bufferDistance

> **bufferDistance**: `number`

The distance of the buffer, use with distanceUnit e.g. 100 KM or 10 mile

### distanceUnit

> **distanceUnit**: `DistanceUnit`

The unit of the distance. See DistanceUnit

### geoms

> **geoms**: [`SpatialGeometry`](SpatialGeometry.md)

The geometries to get the buffers See [SpatialGeometry](SpatialGeometry.md)

### pointsPerCircle?

> `optional` **pointsPerCircle**: `number`

The number of points per circle. This determines the granularity of the buffer.
More points will result in a smoother buffer but will also increase the memory usage.
