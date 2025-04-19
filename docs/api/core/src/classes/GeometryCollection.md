[geodalib](../../../modules.md) / [core/src](../index.md) / GeometryCollection

# Class: GeometryCollection

Defined in: common/dist/wasm/index.d.ts:19

Base class for geometry collections

## Constructors

### new GeometryCollection()

> **new GeometryCollection**(): [`GeometryCollection`](GeometryCollection.md)

Defined in: common/dist/wasm/index.d.ts:23

Constructor for the base geometry collection class

#### Returns

[`GeometryCollection`](GeometryCollection.md)

## Methods

### buffer()

> **buffer**(`index`, `dist`, `pointsPerCircle`): `Polygon`

Defined in: common/dist/wasm/index.d.ts:28

#### Parameters

##### index

`number`

##### dist

`number`

##### pointsPerCircle

`number`

#### Returns

`Polygon`

***

### delete()

> **delete**(): `void`

Defined in: common/dist/wasm/index.d.ts:24

#### Returns

`void`

***

### getArea()

> **getArea**(`index`): `number`

Defined in: common/dist/wasm/index.d.ts:29

#### Parameters

##### index

`number`

#### Returns

`number`

***

### getCentroids()

> **getCentroids**(): `VecVecDouble`

Defined in: common/dist/wasm/index.d.ts:27

#### Returns

`VecVecDouble`

***

### getLength()

> **getLength**(`index`): `number`

Defined in: common/dist/wasm/index.d.ts:30

#### Parameters

##### index

`number`

#### Returns

`number`

***

### getPerimeter()

> **getPerimeter**(`index`): `number`

Defined in: common/dist/wasm/index.d.ts:31

#### Parameters

##### index

`number`

#### Returns

`number`

***

### getType()

> **getType**(): `number`

Defined in: common/dist/wasm/index.d.ts:26

#### Returns

`number`

***

### size()

> **size**(): `number`

Defined in: common/dist/wasm/index.d.ts:25

#### Returns

`number`
