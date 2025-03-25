[geoda-wasm](../globals.md) / GeoDaInterface

# Interface: GeoDaInterface

Defined in: [wasm/index.d.ts:664](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L664)

## Properties

### DiagnosticReport

> **DiagnosticReport**: *typeof* `DiagnosticReport`

Defined in: [wasm/index.d.ts:985](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L985)

***

### GeometryCollection

> **GeometryCollection**: *typeof* `GeometryCollection`

Defined in: [wasm/index.d.ts:971](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L971)

***

### LineCollection

> **LineCollection**: *typeof* `LineCollection`

Defined in: [wasm/index.d.ts:973](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L973)

***

### LisaResult

> **LisaResult**: *typeof* `LisaResult`

Defined in: [wasm/index.d.ts:984](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L984)

***

### PointCollection

> **PointCollection**: *typeof* `PointCollection`

Defined in: [wasm/index.d.ts:974](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L974)

***

### Polygon

> **Polygon**: *typeof* `Polygon`

Defined in: [wasm/index.d.ts:975](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L975)

***

### PolygonCollection

> **PolygonCollection**: *typeof* `PolygonCollection`

Defined in: [wasm/index.d.ts:972](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L972)

***

### VectorDouble

> **VectorDouble**: *typeof* `VectorDouble`

Defined in: [wasm/index.d.ts:980](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L980)

***

### VectorInt

> **VectorInt**: *typeof* `VectorInt`

Defined in: [wasm/index.d.ts:978](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L978)

***

### VectorPolygon

> **VectorPolygon**: *typeof* `VectorPolygon`

Defined in: [wasm/index.d.ts:982](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L982)

***

### VectorString

> **VectorString**: *typeof* `VectorString`

Defined in: [wasm/index.d.ts:983](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L983)

***

### VectorUInt

> **VectorUInt**: *typeof* `VectorUInt`

Defined in: [wasm/index.d.ts:976](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L976)

***

### VecVecDouble

> **VecVecDouble**: *typeof* `VecVecDouble`

Defined in: [wasm/index.d.ts:981](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L981)

***

### VecVecInt

> **VecVecInt**: *typeof* `VecVecInt`

Defined in: [wasm/index.d.ts:979](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L979)

***

### VecVecUInt

> **VecVecUInt**: *typeof* `VecVecUInt`

Defined in: [wasm/index.d.ts:977](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L977)

## Methods

### bivariateLocalMoran()

> **bivariateLocalMoran**(`data1`, `data2`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: [wasm/index.d.ts:797](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L797)

Bivariate Local Moran statistics

#### Parameters

##### data1

`VectorDouble`

the first data values

##### data2

`VectorDouble`

the second data values

##### neighbors

`VecVecUInt`

the spatial weights matrix that represents neighbor indices: [[1, 2], [0, 2], [0, 1],...]

##### undefs

`VectorUInt`

the undefined values

##### significanceCutoff

`number`

the significance cutoff

##### permuations

`number`

the number of permutations

##### lastSeed

`number`

the last seed

#### Returns

`LisaResult`

***

### boxBreaks()

> **boxBreaks**(`data`, `undefs`, `hinge`): `VectorDouble`

Defined in: [wasm/index.d.ts:760](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L760)

Box breaks classification: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier

#### Parameters

##### data

`VectorDouble`

the values to be classified

##### undefs

`VectorInt`

the flags of undefined values

##### hinge

`number`

the hinge value, default is 1.5 and could be 3.0

#### Returns

`VectorDouble`

***

### dotProduct()

> **dotProduct**(`x`, `y`): `number`

Defined in: [wasm/index.d.ts:886](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L886)

#### Parameters

##### x

`VectorDouble`

##### y

`VectorDouble`

#### Returns

`number`

***

### equalIntervalBreaks()

> **equalIntervalBreaks**(`k`, `data`, `undefs`?): `VectorDouble`

Defined in: [wasm/index.d.ts:745](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L745)

Equal interval breaks classification

#### Parameters

##### k

`number`

number of breaks

##### data

`VectorDouble`

the values to be classified into k classes

##### undefs?

`VectorInt`

the flags of undefined values

#### Returns

`VectorDouble`

***

### getDistanceThresholds()

> **getDistanceThresholds**(`geometries`, `isMile`): `VectorDouble`

Defined in: [wasm/index.d.ts:721](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L721)

get the distance thresholds of a collection of geometries that guarantee 1 nearest neighbors

#### Parameters

##### geometries

`GeometryCollection`

the collection of geometries

##### isMile

`boolean`

the unit of distance

#### Returns

`VectorDouble`

***

### getDistanceWeights()

> **getDistanceWeights**(`geometries`, `threshold`, `isMile`): `VecVecUInt`

Defined in: [wasm/index.d.ts:710](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L710)

get the nearest neighbors of a collection of geometries

#### Parameters

##### geometries

`GeometryCollection`

the collection of geometries

##### threshold

`number`

the distance threshold

##### isMile

`boolean`

the unit of distance

#### Returns

`VecVecUInt`

***

### getNearestNeighbors()

> **getNearestNeighbors**(`geometries`, `k`): `VecVecUInt`

Defined in: [wasm/index.d.ts:702](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L702)

get the nearest neighbors of a collection of geometries

#### Parameters

##### geometries

`GeometryCollection`

the collection of geometries

##### k

`number`

the number of nearest neighbors

#### Returns

`VecVecUInt`

***

### getPointContiguityWeights()

> **getPointContiguityWeights**(`geometries`, `isQueen`, `precisionThreshold`, `orderOfContiguity`, `includeLowerOrder`): `VecVecUInt`

Defined in: [wasm/index.d.ts:673](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L673)

get the contiguity neighbors using the centroids of a collection of geometries

#### Parameters

##### geometries

`GeometryCollection`

##### isQueen

`boolean`

##### precisionThreshold

`number`

##### orderOfContiguity

`number`

##### includeLowerOrder

`boolean`

#### Returns

`VecVecUInt`

***

### getPolygonContiguityWeights()

> **getPolygonContiguityWeights**(`geometries`, `isQueen`, `precisionThreshold`, `orderOfContiguity`, `includeLowerOrder`): `VecVecUInt`

Defined in: [wasm/index.d.ts:689](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L689)

get the contiguity neighbors of a collection of polygons

#### Parameters

##### geometries

`GeometryCollection`

##### isQueen

`boolean`

##### precisionThreshold

`number`

##### orderOfContiguity

`number`

##### includeLowerOrder

`boolean`

#### Returns

`VecVecUInt`

***

### linearRegression()

> **linearRegression**(`dep`, `indeps`, `weights`, `weightsValues`, `depName`, `indepNames`, `datasetName`, `depUndefs`, `indepUndefs`): `DiagnosticReport`

Defined in: [wasm/index.d.ts:900](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L900)

#### Parameters

##### dep

`VectorDouble`

The values of the dependent variable

##### indeps

`VecVecDouble`

The values of the independent variables, it's a 2D array

##### weights

`VecVecUInt`

The spatial weights represented as a 2D array and each row shows the neighbors of the corresponding observation

##### weightsValues

`VecVecDouble`

The spatial weights values represented as a 2D array and each row shows the neighbors of the corresponding observation

##### depName

`string`

The name of the dependent variable

##### indepNames

`VectorString`

The names of the independent variables

##### datasetName

`string`

The name of the dataset

##### depUndefs

`VectorUInt`

The 0/1 array indicating the undefined values of the dependent variable

##### indepUndefs

`VecVecUInt`

The 2D array of 0/1 indicating the undefined values of the independent variables

#### Returns

`DiagnosticReport`

***

### localG()

> **localG**(`data`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`, `isGStar`): `LisaResult`

Defined in: [wasm/index.d.ts:817](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L817)

Local Getis-Ord statistics

#### Parameters

##### data

`VectorDouble`

the data values

##### neighbors

`VecVecUInt`

the spatial weights matrix that represents neighbor indices: [[1, 2], [0, 2], [0, 1],...]

##### undefs

`VectorUInt`

the undefined values

##### significanceCutoff

`number`

the significance cutoff

##### permuations

`number`

the number of permutations

##### lastSeed

`number`

the last seed

##### isGStar

`number`

whether to use G* or G

#### Returns

`LisaResult`

***

### localGeary()

> **localGeary**(`data`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: [wasm/index.d.ts:836](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L836)

Local Geary statistics

#### Parameters

##### data

`VectorDouble`

the data values

##### neighbors

`VecVecUInt`

the spatial weights matrix that represents neighbor indices: [[1, 2], [0, 2], [0, 1],...]

##### undefs

`VectorUInt`

the undefined values

##### significanceCutoff

`number`

the significance cutoff

##### permuations

`number`

the number of permutations

##### lastSeed

`number`

the last seed

#### Returns

`LisaResult`

***

### localMoran()

> **localMoran**(`data`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: [wasm/index.d.ts:778](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L778)

Local Moran statistics

#### Parameters

##### data

`VectorDouble`

the data values

##### neighbors

`VecVecUInt`

the spatial weights matrix that represents neighbor indices: [[1, 2], [0, 2], [0, 1],...]

##### undefs

`VectorUInt`

the undefined values

##### significanceCutoff

`number`

the significance cutoff

##### permuations

`number`

the number of permutations

##### lastSeed

`number`

the last seed

#### Returns

`LisaResult`

***

### multivariateLocalGeary()

> **multivariateLocalGeary**(`data`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: [wasm/index.d.ts:854](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L854)

Multivariate Local Geary statistics

#### Parameters

##### data

`VecVecDouble`

the array of data values

##### neighbors

`VecVecUInt`

the spatial weights matrix that represents neighbor indices: [[1, 2], [0, 2], [0, 1],...]

##### undefs

`VecVecUInt`

the array of undefined values

##### significanceCutoff

`number`

the significance cutoff

##### permuations

`number`

the number of permutations

##### lastSeed

`number`

the last seed

#### Returns

`LisaResult`

***

### naturalBreaks()

> **naturalBreaks**(`k`, `data`, `undefs`?): `VectorDouble`

Defined in: [wasm/index.d.ts:737](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L737)

Natural Jenks breaks classification

#### Parameters

##### k

`number`

number of breaks

##### data

`VectorDouble`

the values to be classified into k classes

##### undefs?

`VectorInt`

the indices of data that are undefined

#### Returns

`VectorDouble`

***

### percentileBreaks()

> **percentileBreaks**(`data`, `undefs`?): `VectorDouble`

Defined in: [wasm/index.d.ts:752](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L752)

Percentile breaks classification: <1%, 1-10%, 10-50%, 50-90%, 90-99%, >99%

#### Parameters

##### data

`VectorDouble`

the values to be classified

##### undefs?

`VectorInt`

the flags of undefined values

#### Returns

`VectorDouble`

***

### quantileBreaks()

> **quantileBreaks**(`k`, `data`, `undefs`?): `VectorDouble`

Defined in: [wasm/index.d.ts:729](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L729)

#### Parameters

##### k

`number`

the number of breaks

##### data

`VectorDouble`

the values to be classified into k classes

##### undefs?

`VectorUInt`

the indices of data that are undefined

#### Returns

`VectorDouble`

***

### quantileLisa()

> **quantileLisa**(`k`, `quantile`, `data`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: [wasm/index.d.ts:874](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L874)

Local Quantile LISA statistics

#### Parameters

##### k

`number`

the number of breaks

##### quantile

`number`

which quantile to use

##### data

`VectorDouble`

the data values

##### neighbors

`VecVecUInt`

the spatial weights matrix that represents neighbor indices: [[1, 2], [0, 2], [0, 1],...]

##### undefs

`VectorUInt`

the undefined values

##### significanceCutoff

`number`

the significance cutoff

##### permuations

`number`

the number of permutations

##### lastSeed

`number`

the last seed

#### Returns

`LisaResult`

***

### spatialError()

> **spatialError**(`dep`, `indeps`, `weights`, `weightsValues`, `depName`, `indepNames`, `datasetName`, `depUndefs`, `indepUndefs`): `DiagnosticReport`

Defined in: [wasm/index.d.ts:948](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L948)

Spatial Error regression

#### Parameters

##### dep

`VectorDouble`

The values of the dependent variable

##### indeps

`VecVecDouble`

The values of the independent variables, it's a 2D array

##### weights

`VecVecUInt`

The spatial weights represented as a 2D array and each row shows the neighbors of the corresponding observation

##### weightsValues

`VecVecDouble`

The spatial weights values represented as a 2D array and each row shows the neighbors of the corresponding observation

##### depName

`string`

The name of the dependent variable

##### indepNames

`VectorString`

The names of the independent variables

##### datasetName

`string`

The name of the dataset

##### depUndefs

`VectorUInt`

The 0/1 array indicating the undefined values of the dependent variable

##### indepUndefs

`VecVecUInt`

The 2D array of 0/1 indicating the undefined values of the independent variables

#### Returns

`DiagnosticReport`

***

### spatialJoin()

> **spatialJoin**(`left`, `right`): `VecVecUInt`

Defined in: [wasm/index.d.ts:966](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L966)

Spatial Join of two collections of geometries

#### Parameters

##### left

`GeometryCollection`

The left collection of geometries

##### right

`GeometryCollection`

The right collection of geometries

#### Returns

`VecVecUInt`

The indices of the right geometries that are spatially joined to the left geometries

***

### spatialLag()

> **spatialLag**(`dep`, `indeps`, `weights`, `weightsValues`, `depName`, `indepNames`, `datasetName`, `depUndefs`, `indepUndefs`): `DiagnosticReport`

Defined in: [wasm/index.d.ts:924](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L924)

Spatial Lag regression

#### Parameters

##### dep

`VectorDouble`

The values of the dependent variable

##### indeps

`VecVecDouble`

The values of the independent variables, it's a 2D array

##### weights

`VecVecUInt`

The spatial weights represented as a 2D array and each row shows the neighbors of the corresponding observation

##### weightsValues

`VecVecDouble`

The spatial weights values represented as a 2D array and each row shows the neighbors of the corresponding observation

##### depName

`string`

The name of the dependent variable

##### indepNames

`VectorString`

The names of the independent variables

##### datasetName

`string`

The name of the dataset

##### depUndefs

`VectorUInt`

The 0/1 array indicating the undefined values of the dependent variable

##### indepUndefs

`VecVecUInt`

The 2D array of 0/1 indicating the undefined values of the independent variables

#### Returns

`DiagnosticReport`

***

### standardDeviationBreaks()

> **standardDeviationBreaks**(`data`, `undefs`): `VectorDouble`

Defined in: [wasm/index.d.ts:767](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/wasm/index.d.ts#L767)

Standard deviation breaks classification

#### Parameters

##### data

`VectorDouble`

the values to be classified

##### undefs

`VectorInt`

the flags of undefined values

#### Returns

`VectorDouble`
