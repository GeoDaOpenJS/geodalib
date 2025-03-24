# class `geoda::LineCollection` 

```
class geoda::LineCollection
  : public geoda::GeometryCollection
```  

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::vector< `[`multiline_type`](./cpp/api-multiline_type.md#geometry_8h_1a4cace7380b22e2b7925d0b7f9847d782)` > `[`lines`](#classgeoda_1_1_line_collection_1a95fdd8627a9ecab6dcbf4772fa609beb) | 
`public  `[`LineCollection`](#classgeoda_1_1_line_collection_1a4e7fac56dd2478463cd8c685d3c59331)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & sizes,bool convert_to_UTM)` | 
`public  `[`~LineCollection`](#classgeoda_1_1_line_collection_1ab7685b62ef3310025a1fbc3f04a8d01f)`() = default` | 
`public inline virtual void `[`get_bbox`](#classgeoda_1_1_line_collection_1a55a24763a2d11faf537ebe17eba36032)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` | 
`public inline virtual `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_line_collection_1a17d324019eb5efe1c43e714b6e8e490c)`() const` | 
`public virtual std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_line_collection_1a8253fc2d9b5ca547f3b027b2ad161e6e)`() const` | 
`public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_line_collection_1af24426fbe90e3761b0ed6f2b8c874d44)`(size_t i) const` | 
`public inline virtual `[`multiline_type`](./cpp/api-multiline_type.md#geometry_8h_1a4cace7380b22e2b7925d0b7f9847d782)` `[`get_line`](#classgeoda_1_1_line_collection_1aa2e984ac32f44f01c901e45596727d51)`(size_t i) const` | 
`public inline virtual bool `[`intersect`](#classgeoda_1_1_line_collection_1ab894f0aa09a673cd42bd75465bb6038e)`(size_t i,const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` | 

## Members

#### `public std::vector< `[`multiline_type`](./cpp/api-multiline_type.md#geometry_8h_1a4cace7380b22e2b7925d0b7f9847d782)` > `[`lines`](#classgeoda_1_1_line_collection_1a95fdd8627a9ecab6dcbf4772fa609beb) 

#### `public  `[`LineCollection`](#classgeoda_1_1_line_collection_1a4e7fac56dd2478463cd8c685d3c59331)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & sizes,bool convert_to_UTM)` 

#### `public  `[`~LineCollection`](#classgeoda_1_1_line_collection_1ab7685b62ef3310025a1fbc3f04a8d01f)`() = default` 

#### `public inline virtual void `[`get_bbox`](#classgeoda_1_1_line_collection_1a55a24763a2d11faf537ebe17eba36032)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` 

#### `public inline virtual `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_line_collection_1a17d324019eb5efe1c43e714b6e8e490c)`() const` 

#### `public virtual std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_line_collection_1a8253fc2d9b5ca547f3b027b2ad161e6e)`() const` 

#### `public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_line_collection_1af24426fbe90e3761b0ed6f2b8c874d44)`(size_t i) const` 

#### `public inline virtual `[`multiline_type`](./cpp/api-multiline_type.md#geometry_8h_1a4cace7380b22e2b7925d0b7f9847d782)` `[`get_line`](#classgeoda_1_1_line_collection_1aa2e984ac32f44f01c901e45596727d51)`(size_t i) const` 

#### `public inline virtual bool `[`intersect`](#classgeoda_1_1_line_collection_1ab894f0aa09a673cd42bd75465bb6038e)`(size_t i,const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` 

