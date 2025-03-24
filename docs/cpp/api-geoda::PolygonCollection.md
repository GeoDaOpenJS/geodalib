# class `geoda::PolygonCollection` 

```
class geoda::PolygonCollection
  : public geoda::GeometryCollection
```  

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::vector< unsigned int > `[`holes`](#classgeoda_1_1_polygon_collection_1af225c80a52c8390efed41ba53faacc7f) | 
`public std::vector< `[`multipolygon_type`](./cpp/api-multipolygon_type.md#geometry_8h_1ad9cc59b99ad17c2cd9f79fd375e88752)` > `[`polygons`](#classgeoda_1_1_polygon_collection_1af147a9fc1724c0a17a29e544df674499) | 
`public  `[`PolygonCollection`](#classgeoda_1_1_polygon_collection_1af69c0dbe3180ab6e4ab08386d33a0e43)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & holes,const std::vector< unsigned int > & sizes,bool fix_polygon,bool convert_to_UTM)` | 
`public  `[`~PolygonCollection`](#classgeoda_1_1_polygon_collection_1a1bed1e43df883b96fab1944890cf4305)`() = default` | 
`public inline virtual void `[`get_bbox`](#classgeoda_1_1_polygon_collection_1a61f53ffa0c91a79b38c5ccb3b96dfe97)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` | 
`public inline virtual `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_polygon_collection_1a7935f997727f1650289683122f12d5b2)`() const` | 
`public virtual std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_polygon_collection_1a2c89fb3c1d3fcec6c76d9275a8e1ecac)`() const` | 
`public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_polygon_collection_1a10b370fc79b726b4f2ad7e692f35cc6a)`(size_t i) const` | 
`public inline virtual `[`multipolygon_type`](./cpp/api-multipolygon_type.md#geometry_8h_1ad9cc59b99ad17c2cd9f79fd375e88752)` `[`get_polygon`](#classgeoda_1_1_polygon_collection_1a39782c0e0ba343a250f9db5d87b9c10e)`(size_t i) const` | 
`public void `[`get_polygon`](#classgeoda_1_1_polygon_collection_1abc609a571f688b404ef5deb6c18019dd)`(size_t polygon_index,`[`Polygon`](./cpp/api-geoda::Polygon.md#classgeoda_1_1_polygon)` & poly)` | 
`public virtual int `[`get_part`](#classgeoda_1_1_polygon_collection_1a40fbd11ed2b52766117f0b720bfea888)`(size_t geom_index,size_t part_index) const` | 
`public virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_point`](#classgeoda_1_1_polygon_collection_1afe1714f8c679c2688dbc8ab2e88a89f7)`(size_t geom_index,size_t point_index) const` | 
`public virtual size_t `[`get_num_parts`](#classgeoda_1_1_polygon_collection_1addc989726ed3ddb6237aa1ea2e10d63a)`(size_t geom_index) const` | 
`public virtual size_t `[`get_num_points`](#classgeoda_1_1_polygon_collection_1a8a6d0fa2021b81137847394d47591d2c)`(size_t geom_index) const` | 
`public inline virtual bool `[`intersect`](#classgeoda_1_1_polygon_collection_1a33cd8020b3631e935eeb2be1c86695db)`(size_t i,const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` | 

## Members

#### `public std::vector< unsigned int > `[`holes`](#classgeoda_1_1_polygon_collection_1af225c80a52c8390efed41ba53faacc7f) 

#### `public std::vector< `[`multipolygon_type`](./cpp/api-multipolygon_type.md#geometry_8h_1ad9cc59b99ad17c2cd9f79fd375e88752)` > `[`polygons`](#classgeoda_1_1_polygon_collection_1af147a9fc1724c0a17a29e544df674499) 

#### `public  `[`PolygonCollection`](#classgeoda_1_1_polygon_collection_1af69c0dbe3180ab6e4ab08386d33a0e43)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & holes,const std::vector< unsigned int > & sizes,bool fix_polygon,bool convert_to_UTM)` 

#### `public  `[`~PolygonCollection`](#classgeoda_1_1_polygon_collection_1a1bed1e43df883b96fab1944890cf4305)`() = default` 

#### `public inline virtual void `[`get_bbox`](#classgeoda_1_1_polygon_collection_1a61f53ffa0c91a79b38c5ccb3b96dfe97)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` 

#### `public inline virtual `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_polygon_collection_1a7935f997727f1650289683122f12d5b2)`() const` 

#### `public virtual std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_polygon_collection_1a2c89fb3c1d3fcec6c76d9275a8e1ecac)`() const` 

#### `public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_polygon_collection_1a10b370fc79b726b4f2ad7e692f35cc6a)`(size_t i) const` 

#### `public inline virtual `[`multipolygon_type`](./cpp/api-multipolygon_type.md#geometry_8h_1ad9cc59b99ad17c2cd9f79fd375e88752)` `[`get_polygon`](#classgeoda_1_1_polygon_collection_1a39782c0e0ba343a250f9db5d87b9c10e)`(size_t i) const` 

#### `public void `[`get_polygon`](#classgeoda_1_1_polygon_collection_1abc609a571f688b404ef5deb6c18019dd)`(size_t polygon_index,`[`Polygon`](./cpp/api-geoda::Polygon.md#classgeoda_1_1_polygon)` & poly)` 

#### `public virtual int `[`get_part`](#classgeoda_1_1_polygon_collection_1a40fbd11ed2b52766117f0b720bfea888)`(size_t geom_index,size_t part_index) const` 

#### `public virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_point`](#classgeoda_1_1_polygon_collection_1afe1714f8c679c2688dbc8ab2e88a89f7)`(size_t geom_index,size_t point_index) const` 

#### `public virtual size_t `[`get_num_parts`](#classgeoda_1_1_polygon_collection_1addc989726ed3ddb6237aa1ea2e10d63a)`(size_t geom_index) const` 

#### `public virtual size_t `[`get_num_points`](#classgeoda_1_1_polygon_collection_1a8a6d0fa2021b81137847394d47591d2c)`(size_t geom_index) const` 

#### `public inline virtual bool `[`intersect`](#classgeoda_1_1_polygon_collection_1a33cd8020b3631e935eeb2be1c86695db)`(size_t i,const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` 

