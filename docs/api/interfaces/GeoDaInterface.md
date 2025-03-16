[**geoda-wasm**](../README.md)

***

[geoda-wasm](../globals.md) / GeoDaInterface

# Interface: GeoDaInterface

Defined in: [wasm/index.d.ts:663](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L663)

## Properties

### DiagnosticReport

> **DiagnosticReport**: *typeof* `DiagnosticReport`

Defined in: [wasm/index.d.ts:984](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L984)

***

### GeometryCollection

> **GeometryCollection**: *typeof* `GeometryCollection`

Defined in: [wasm/index.d.ts:970](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L970)

***

### LineCollection

> **LineCollection**: *typeof* `LineCollection`

Defined in: [wasm/index.d.ts:972](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L972)

***

### LisaResult

> **LisaResult**: *typeof* `LisaResult`

Defined in: [wasm/index.d.ts:983](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L983)

***

### PointCollection

> **PointCollection**: *typeof* `PointCollection`

Defined in: [wasm/index.d.ts:973](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L973)

***

### Polygon

> **Polygon**: *typeof* `Polygon`

Defined in: [wasm/index.d.ts:974](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L974)

***

### PolygonCollection

> **PolygonCollection**: *typeof* `PolygonCollection`

Defined in: [wasm/index.d.ts:971](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L971)

***

### VectorDouble

> **VectorDouble**: *typeof* `VectorDouble`

Defined in: [wasm/index.d.ts:979](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L979)

***

### VectorInt

> **VectorInt**: *typeof* `VectorInt`

Defined in: [wasm/index.d.ts:977](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L977)

***

### VectorPolygon

> **VectorPolygon**: *typeof* `VectorPolygon`

Defined in: [wasm/index.d.ts:981](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L981)

***

### VectorString

> **VectorString**: *typeof* `VectorString`

Defined in: [wasm/index.d.ts:982](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L982)

***

### VectorUInt

> **VectorUInt**: *typeof* `VectorUInt`

Defined in: [wasm/index.d.ts:975](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L975)

***

### VecVecDouble

> **VecVecDouble**: *typeof* `VecVecDouble`

Defined in: [wasm/index.d.ts:980](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L980)

***

### VecVecInt

> **VecVecInt**: *typeof* `VecVecInt`

Defined in: [wasm/index.d.ts:978](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L978)

***

### VecVecUInt

> **VecVecUInt**: *typeof* `VecVecUInt`

Defined in: [wasm/index.d.ts:976](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L976)

## Methods

### bivariateLocalMoran()

> **bivariateLocalMoran**(`data1`, `data2`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: [wasm/index.d.ts:796](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L796)

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

Defined in: [wasm/index.d.ts:759](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L759)

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

Defined in: [wasm/index.d.ts:885](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L885)

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

Defined in: [wasm/index.d.ts:744](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L744)

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

Defined in: [wasm/index.d.ts:720](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L720)

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

Defined in: [wasm/index.d.ts:709](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L709)

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

Defined in: [wasm/index.d.ts:701](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L701)

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

Defined in: [wasm/index.d.ts:672](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L672)

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

Defined in: [wasm/index.d.ts:688](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L688)

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

Defined in: [wasm/index.d.ts:899](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L899)

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

Defined in: [wasm/index.d.ts:816](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L816)

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

Defined in: [wasm/index.d.ts:835](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L835)

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

Defined in: [wasm/index.d.ts:777](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L777)

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

Defined in: [wasm/index.d.ts:853](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L853)

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

Defined in: [wasm/index.d.ts:736](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L736)

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

Defined in: [wasm/index.d.ts:751](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L751)

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

Defined in: [wasm/index.d.ts:728](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L728)

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

Defined in: [wasm/index.d.ts:873](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L873)

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

Defined in: [wasm/index.d.ts:947](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L947)

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

Defined in: [wasm/index.d.ts:965](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L965)

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

Defined in: [wasm/index.d.ts:923](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L923)

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

Defined in: [wasm/index.d.ts:766](https://github.com/GeoDaCenter/geoda-lib/blob/0ad3977fd23db605b1dc766f99d329a28ef59f68/src/js/wasm/index.d.ts#L766)

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
