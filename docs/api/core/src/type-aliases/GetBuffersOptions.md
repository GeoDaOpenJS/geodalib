[geodalib](../../../modules.md) / [core/src](../index.md) / GetBuffersOptions

# Type Alias: GetBuffersOptions

> **GetBuffersOptions**: `object`

Defined in: [core/src/geometry/buffer.ts:9](https://github.com/GeoDaCenter/geoda-lib/blob/3f9453a08cf3d7f96b1a0d65d18359804129d8d2/js/packages/core/src/geometry/buffer.ts#L9)

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
