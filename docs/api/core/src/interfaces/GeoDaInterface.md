[geodalib](../../../modules.md) / [core/src](../index.md) / GeoDaInterface

# Interface: GeoDaInterface

Defined in: common/dist/wasm/index.d.ts:696

## Properties

### DiagnosticReport

> **DiagnosticReport**: *typeof* `DiagnosticReport`

Defined in: common/dist/wasm/index.d.ts:1164

***

### GeometryCollection

> **GeometryCollection**: *typeof* [`GeometryCollection`](../classes/GeometryCollection.md)

Defined in: common/dist/wasm/index.d.ts:1148

***

### Line

> **Line**: *typeof* `Line`

Defined in: common/dist/wasm/index.d.ts:1153

***

### LineCollection

> **LineCollection**: *typeof* `LineCollection`

Defined in: common/dist/wasm/index.d.ts:1150

***

### LisaResult

> **LisaResult**: *typeof* `LisaResult`

Defined in: common/dist/wasm/index.d.ts:1163

***

### PointCollection

> **PointCollection**: *typeof* `PointCollection`

Defined in: common/dist/wasm/index.d.ts:1151

***

### Polygon

> **Polygon**: *typeof* `Polygon`

Defined in: common/dist/wasm/index.d.ts:1152

***

### PolygonCollection

> **PolygonCollection**: *typeof* `PolygonCollection`

Defined in: common/dist/wasm/index.d.ts:1149

***

### VectorDouble

> **VectorDouble**: *typeof* `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:1158

***

### VectorInt

> **VectorInt**: *typeof* `VectorInt`

Defined in: common/dist/wasm/index.d.ts:1156

***

### VectorLine

> **VectorLine**: *typeof* `VectorLine`

Defined in: common/dist/wasm/index.d.ts:1161

***

### VectorPolygon

> **VectorPolygon**: *typeof* `VectorPolygon`

Defined in: common/dist/wasm/index.d.ts:1160

***

### VectorString

> **VectorString**: *typeof* `VectorString`

Defined in: common/dist/wasm/index.d.ts:1162

***

### VectorUInt

> **VectorUInt**: *typeof* `VectorUInt`

Defined in: common/dist/wasm/index.d.ts:1154

***

### VecVecDouble

> **VecVecDouble**: *typeof* `VecVecDouble`

Defined in: common/dist/wasm/index.d.ts:1159

***

### VecVecInt

> **VecVecInt**: *typeof* `VecVecInt`

Defined in: common/dist/wasm/index.d.ts:1157

***

### VecVecUInt

> **VecVecUInt**: *typeof* `VecVecUInt`

Defined in: common/dist/wasm/index.d.ts:1155

## Methods

### bivariateLocalMoran()

> **bivariateLocalMoran**(`data1`, `data2`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: common/dist/wasm/index.d.ts:970

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

Defined in: common/dist/wasm/index.d.ts:933

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

### cartogram()

> **cartogram**(`geoms`, `values`, `iterations`, `numberOfPointsPerCircle`): `CartogramResult`

Defined in: common/dist/wasm/index.d.ts:721

Calculate the Cartogram

#### Parameters

##### geoms

[`GeometryCollection`](../classes/GeometryCollection.md)

The collection of geometries

##### values

`VectorDouble`

The values to be used for the cartogram

##### iterations

`number`

The number of iterations to run the cartogram

##### numberOfPointsPerCircle

`number`

#### Returns

`CartogramResult`

The Cartogram Circles

***

### deviationFromMean()

> **deviationFromMean**(`data`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:734

Calculate the deviation from the mean

#### Parameters

##### data

`VectorDouble`

The data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The deviation from the mean

***

### dotProduct()

> **dotProduct**(`x`, `y`): `number`

Defined in: common/dist/wasm/index.d.ts:1059

#### Parameters

##### x

`VectorDouble`

##### y

`VectorDouble`

#### Returns

`number`

***

### empiricalBayes()

> **empiricalBayes**(`baseData`, `eventData`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:793

Calculate the empirical Bayes

#### Parameters

##### baseData

`VectorDouble`

The base data values

##### eventData

`VectorDouble`

The event data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The empirical Bayes

***

### equalIntervalBreaks()

> **equalIntervalBreaks**(`k`, `data`, `undefs`?): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:918

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

### excessRisk()

> **excessRisk**(`baseData`, `eventData`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:784

Calculate the excess risk

#### Parameters

##### baseData

`VectorDouble`

The base data values

##### eventData

`VectorDouble`

The event data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The excess risk

***

### getDistanceThresholds()

> **getDistanceThresholds**(`geometries`, `isMile`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:894

get the distance thresholds of a collection of geometries that guarantee 1 nearest neighbors

#### Parameters

##### geometries

[`GeometryCollection`](../classes/GeometryCollection.md)

the collection of geometries

##### isMile

`boolean`

the unit of distance

#### Returns

`VectorDouble`

***

### getDistanceWeights()

> **getDistanceWeights**(`geometries`, `threshold`, `isMile`): `VecVecUInt`

Defined in: common/dist/wasm/index.d.ts:883

get the nearest neighbors of a collection of geometries

#### Parameters

##### geometries

[`GeometryCollection`](../classes/GeometryCollection.md)

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

Defined in: common/dist/wasm/index.d.ts:875

get the nearest neighbors of a collection of geometries

#### Parameters

##### geometries

[`GeometryCollection`](../classes/GeometryCollection.md)

the collection of geometries

##### k

`number`

the number of nearest neighbors

#### Returns

`VecVecUInt`

***

### getPointContiguityWeights()

> **getPointContiguityWeights**(`geometries`, `isQueen`, `precisionThreshold`, `orderOfContiguity`, `includeLowerOrder`): `VecVecUInt`

Defined in: common/dist/wasm/index.d.ts:846

get the contiguity neighbors using the centroids of a collection of geometries

#### Parameters

##### geometries

[`GeometryCollection`](../classes/GeometryCollection.md)

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

Defined in: common/dist/wasm/index.d.ts:862

get the contiguity neighbors of a collection of polygons

#### Parameters

##### geometries

[`GeometryCollection`](../classes/GeometryCollection.md)

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

Defined in: common/dist/wasm/index.d.ts:1073

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

Defined in: common/dist/wasm/index.d.ts:990

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

Defined in: common/dist/wasm/index.d.ts:1009

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

Defined in: common/dist/wasm/index.d.ts:951

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

### mst()

> **mst**(`x`, `y`, `weights`): `VectorLine`

Defined in: common/dist/wasm/index.d.ts:712

Calculate the Minimum Spanning Tree

#### Parameters

##### x

`VectorDouble`

The centroid x coordinates

##### y

`VectorDouble`

The centroid y coordinates

##### weights

`VectorDouble`

The weights of the edges

#### Returns

`VectorLine`

The Minimum Spanning Tree

***

### multivariateLocalGeary()

> **multivariateLocalGeary**(`data`, `neighbors`, `undefs`, `significanceCutoff`, `permuations`, `lastSeed`): `LisaResult`

Defined in: common/dist/wasm/index.d.ts:1027

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

Defined in: common/dist/wasm/index.d.ts:910

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

Defined in: common/dist/wasm/index.d.ts:925

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

Defined in: common/dist/wasm/index.d.ts:902

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

Defined in: common/dist/wasm/index.d.ts:1047

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

### rangeAdjust()

> **rangeAdjust**(`data`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:750

Range adjust the data

#### Parameters

##### data

`VectorDouble`

The data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The range adjusted data

***

### rangeStandardize()

> **rangeStandardize**(`data`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:758

Range standardize the data

#### Parameters

##### data

`VectorDouble`

The data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The range standardized data

***

### rateStandardizeEmpiricalBayes()

> **rateStandardizeEmpiricalBayes**(`baseData`, `eventData`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:817

Calculate the rate standardize empirical Bayes

#### Parameters

##### baseData

`VectorDouble`

The base data values

##### eventData

`VectorDouble`

The event data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The rate standardize empirical Bayes

***

### rawRate()

> **rawRate**(`baseData`, `eventData`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:775

Calculate the raw rate

#### Parameters

##### baseData

`VectorDouble`

The base data values

##### eventData

`VectorDouble`

The event data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The raw rate

***

### spatialDissolve()

> **spatialDissolve**(`polys`): `Polygon`

Defined in: common/dist/wasm/index.d.ts:1146

Spatial Dissolve of a collection of polygons

#### Parameters

##### polys

[`GeometryCollection`](../classes/GeometryCollection.md)

The collection of polygons

#### Returns

`Polygon`

The dissolved polygon

***

### spatialEmpiricalBayes()

> **spatialEmpiricalBayes**(`neighbors`, `baseData`, `eventData`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:831

Calculate the spatial empirical Bayes

#### Parameters

##### neighbors

`VecVecUInt`

The neighbors of each observation

##### baseData

`VectorDouble`

The base data values

##### eventData

`VectorDouble`

The event data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The spatial empirical Bayes

***

### spatialError()

> **spatialError**(`dep`, `indeps`, `weights`, `weightsValues`, `depName`, `indepNames`, `datasetName`, `depUndefs`, `indepUndefs`): `DiagnosticReport`

Defined in: common/dist/wasm/index.d.ts:1121

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

Defined in: common/dist/wasm/index.d.ts:1139

Spatial Join of two collections of geometries

#### Parameters

##### left

[`GeometryCollection`](../classes/GeometryCollection.md)

The left collection of geometries

##### right

[`GeometryCollection`](../classes/GeometryCollection.md)

The right collection of geometries

#### Returns

`VecVecUInt`

The indices of the right geometries that are spatially joined to the left geometries

***

### spatialLag()

> **spatialLag**(`dep`, `indeps`, `weights`, `weightsValues`, `depName`, `indepNames`, `datasetName`, `depUndefs`, `indepUndefs`): `DiagnosticReport`

Defined in: common/dist/wasm/index.d.ts:1097

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

### spatialRate()

> **spatialRate**(`neighbors`, `baseData`, `eventData`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:803

Calculate the spatial rate

#### Parameters

##### neighbors

`VecVecUInt`

The neighbors of each observation

##### baseData

`VectorDouble`

The base data values

##### eventData

`VectorDouble`

The event data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The spatial rate

***

### standardDeviationBreaks()

> **standardDeviationBreaks**(`data`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:940

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

***

### standardize()

> **standardize**(`data`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:766

Standardize the data

#### Parameters

##### data

`VectorDouble`

The data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The standardized data

***

### standardizeMAD()

> **standardizeMAD**(`data`, `undefs`): `VectorDouble`

Defined in: common/dist/wasm/index.d.ts:742

Standardize the data using the Median Absolute Deviation (MAD)

#### Parameters

##### data

`VectorDouble`

The data values

##### undefs

`VectorUInt`

The undefined values

#### Returns

`VectorDouble`

The standardized data

***

### thiessenPolygon()

> **thiessenPolygon**(`x`, `y`): `VectorPolygon`

Defined in: common/dist/wasm/index.d.ts:703

Calculate the Thiessen polygons

#### Parameters

##### x

`VectorDouble`

The centroid x coordinates

##### y

`VectorDouble`

The centroid y coordinates

#### Returns

`VectorPolygon`

The Thiessen polygons
