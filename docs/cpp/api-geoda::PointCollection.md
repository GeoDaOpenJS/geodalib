# class `geoda::PointCollection` 

```
class geoda::PointCollection
  : public geoda::GeometryCollection
```  

[PointCollection](#classgeoda_1_1_point_collection) class for [Point](./cpp/api-geoda::Point.md#classgeoda_1_1_point) or MultiPoint shape type.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::vector< `[`multipoint_type`](./cpp/api-multipoint_type.md#geometry_8h_1adabc488e138eb16d35bb5ab9437ed3e2)` > `[`points`](#classgeoda_1_1_point_collection_1a6ed0c3ce70517956fe772e04be10ab64) | 
`public  `[`PointCollection`](#classgeoda_1_1_point_collection_1a14a4a07a9764a873c484ca2ce848fe9f)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & sizes,bool convert_to_UTM)` | Construct a new [Point](./cpp/api-geoda::Point.md#classgeoda_1_1_point) Collection object.
`public  `[`~PointCollection`](#classgeoda_1_1_point_collection_1a26553cc40bba006f0fde1009ef04f8ed)`() = default` | 
`public inline virtual void `[`get_bbox`](#classgeoda_1_1_point_collection_1a69b5a12de3a654d0ee1534453a151b41)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` | 
`public inline virtual `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_point_collection_1a921fe7b5e7567d09d6906d11fe5cd3fb)`() const` | 
`public virtual std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_point_collection_1a0aecf4ebc56a1b826ed560247400b667)`() const` | 
`public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_point_collection_1a027464f6cbe726125a23b7eac3a08ed3)`(size_t i) const` | 
`public inline virtual `[`multipoint_type`](./cpp/api-multipoint_type.md#geometry_8h_1adabc488e138eb16d35bb5ab9437ed3e2)` `[`get_point`](#classgeoda_1_1_point_collection_1a2439ee91039cbb5fd494630df7f36775)`(size_t i) const` | 
`public inline virtual bool `[`intersect`](#classgeoda_1_1_point_collection_1a6c5cbccddbd2bdeb498d6f003fff1cb8)`(size_t i,const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` | 

## Members

#### `public std::vector< `[`multipoint_type`](./cpp/api-multipoint_type.md#geometry_8h_1adabc488e138eb16d35bb5ab9437ed3e2)` > `[`points`](#classgeoda_1_1_point_collection_1a6ed0c3ce70517956fe772e04be10ab64) 

#### `public  `[`PointCollection`](#classgeoda_1_1_point_collection_1a14a4a07a9764a873c484ca2ce848fe9f)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & sizes,bool convert_to_UTM)` 

Construct a new [Point](./cpp/api-geoda::Point.md#classgeoda_1_1_point) Collection object.

#### Parameters
* `x` The x coordinates 

* `y` The y coordinates 

* `parts` The array of part index for each point geometry 

* `sizes` The array of size (how many parts) of each point geometry 

* `convert_to_UTM` If true, convert the coordinates to [UTM](./cpp/api-UTM.md#namespace_u_t_m) in the unit of meters

#### `public  `[`~PointCollection`](#classgeoda_1_1_point_collection_1a26553cc40bba006f0fde1009ef04f8ed)`() = default` 

#### `public inline virtual void `[`get_bbox`](#classgeoda_1_1_point_collection_1a69b5a12de3a654d0ee1534453a151b41)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` 

#### `public inline virtual `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_point_collection_1a921fe7b5e7567d09d6906d11fe5cd3fb)`() const` 

#### `public virtual std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_point_collection_1a0aecf4ebc56a1b826ed560247400b667)`() const` 

#### `public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_point_collection_1a027464f6cbe726125a23b7eac3a08ed3)`(size_t i) const` 

#### `public inline virtual `[`multipoint_type`](./cpp/api-multipoint_type.md#geometry_8h_1adabc488e138eb16d35bb5ab9437ed3e2)` `[`get_point`](#classgeoda_1_1_point_collection_1a2439ee91039cbb5fd494630df7f36775)`(size_t i) const` 

#### `public inline virtual bool `[`intersect`](#classgeoda_1_1_point_collection_1a6c5cbccddbd2bdeb498d6f003fff1cb8)`(size_t i,const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` 

