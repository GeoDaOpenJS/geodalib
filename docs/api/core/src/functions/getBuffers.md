[geodalib](../../../modules.md) / [core/src](../index.md) / getBuffers

# Function: getBuffers()

> **getBuffers**(`options`): `Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

Defined in: [core/src/geometry/buffer.ts:52](https://github.com/GeoDaCenter/geoda-lib/blob/dd0b55e88e7fa62fd12212664ac5233e391d8b71/js/packages/core/src/geometry/buffer.ts#L52)

Get the buffers of the geometries

## Example
```ts
const geoms = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [100, 0] },
  },
];

const buffers = await getBuffers({
  geoms: geoms,
  bufferDistance: 10,
  distanceUnit: DistanceUnit.Mile,
  pointsPerCircle: 10,
});
```

## Parameters

### options

[`GetBuffersOptions`](../type-aliases/GetBuffersOptions.md)

The options for getting the buffers. See [GetBuffersOptions](../type-aliases/GetBuffersOptions.md)

## Returns

`Promise`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>[]\>

The buffers of the geometries
