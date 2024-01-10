## Usage

For asynchronous call, use `initGeoDa` to return a promise object of the
GeoDa wasm instance:

```javascript
import {initGeoDa} from 'geoda-wasm';

const geoda = await initGeoDa();
```

For synchronous call, use `initGeoDa` to initialize a promise object, then use `setGeoDa` to save the resolved instance as a global variable within the library. You can use `getGeoDa` to get the global wasm instance if needed:

First, init GeoDa:
```javascript
import {initGeoDa, setGeoDa} from 'geoda-wasm';

initGeoDa().then(wasm => setGeoDa(wasm));
```

Then, you can use it synchronously in other places:
```javascript
import {getGeoDa} from 'geoda-wasm';

const geoda = getGeoDa();
```

## Functions

TODO: update the following functions to synchronous functions
### Spatial Join

```javascript
async function spatialJoin(
  source: SpatialJoinInput,
  join: SpatialJoinInput,
  spatialJoinOperation: string
): Promise<number[][] | null>

```
* Arguments:

```javascript
import {Feature} from 'geojson';

type SpatialJoinInput = {
  features: Feature[] | null;
  latitudes: number[] | null;
  longitudes: number[] | null;
};
```

For type definitions for `geojson`, see: https://www.npmjs.com/package/@types/geojson

### Spatial Union

```javascript
async function spatialUnion(polygons: Feature<Polygon|MultiPolygon>[]): Promise<Feature>
```

* Arguments:

```javascript
import {Feature} from 'geojson';
```

### Spatial Count

```javascript
async function spatialCount(polygons: Feature<Polygon|MultiPolygon>[], points: Feature<Point|MultiPoint>[]): Promise<number[]>
```

### Centroids

```javascript
async function getCentroids(geoms: Feature<Polygon|MultiPolygon>[]): Promise<Feature<Point>>[]
```
