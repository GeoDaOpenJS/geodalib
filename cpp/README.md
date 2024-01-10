### Requirements
* CMake (>=3.2)
* Emscripten 3.1.34

#### Mac

On Mac OSX, the “Xcode Command Line Tools” need to be installed 
```
xcode-select --install
```

Install Emscripten and Boost
```
brew install emscripten
brew install boost
```

#### Ubuntu

On Ubuntu, the “Build Essential Tools” needs to be installed 
```
sudo apt-get update
sudo apt-get install build-essential
```

### Run Tests

```sh
scripts/run-tests.sh
```

### Build WebAssembly Module

```sh
scripts/build-wasm.sh
```

The files `index.js` and `geoda.wasm` are located under directory `cpp/build/out/wasm`.

Please refer to `js` folder for a Javascript library that wrappers this WebAssembly module.

## Data Structure

Exchange data between Javascript and WebAssembly

src/spatial_features.h

* geoda::PolygonCollection
* geoda::LineCollection
* geoda::PointCollection

They all implement the interface:
* geoda::GeometryCollection
* geoda::SpatialJoinType

The above data structures are used to transfer data from Javascript to WASM.

The following data structure are used to return data from WASM to Javascript:

* geoda::Polygon
* std::vector< unsigned int>
* std::vector<std::vector< unsigned int>>
* std::vector<std::vector<double>>

## Functions

### Spatial Join

Spatial join on input geometres joining with join geometries

```c++
std::vector<std::vector<int> > geoda::spatial_join(
        const geoda::GeometryCollection& input_geoms,
        const geoda::GeometryCollection& join_geoms,
        SpatialJoinType join_operation);
```

### Spatial Union

Spatial union a collection of polygons (multi-polygons) into a single polygon

```c++
geoda::Polygon geoda::spatial_union(const geoda::PolygonCollection& polys);
```
### Spatial Count

Spatial count how many points inside a collection of polygons

```c++
std::vector<unsigned int> geoda::spatial_count(
    const geoda::PolygonCollection& polys,
    const geoda::PointCollection& points);
```

### Spatial Centroids

Get centroids from a collection of geometries (could be Point/Line/Polygon)

```c++
std::vector<std::vector<double>> geoda::get_centroids(
        const geoda::GeometryCollection& geoms);
```
### k Nearest Neighbors

Get k nearest nerighors from a collection of geometries

```c++
std::vector<std::vector<int>> geoda::knearest_neighbors(
        const geoda::GeometryCollection& geoms,
        unsigned int k);
```

### Local Moran

Apply local moran statitics

```c++
LisaResult geoda::local_moran(
        const std::vector<double>& data,
        const std::vector<std::vector<unsigned int>>& neighbors,
        unsigned int permutations);
```
