# class `geoda::PolygonPartition` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public int `[`NumPoints`](#classgeoda_1_1_polygon_partition_1ac2775a5aa99d1bd9b90eeb52dfd49bc7) | 
`public int `[`NumParts`](#classgeoda_1_1_polygon_partition_1a3309d498158ed08fdc35906fecc0e437) | 
`public inline  explicit `[`PolygonPartition`](#classgeoda_1_1_polygon_partition_1a99e6b939494e6210b6d7b5fb77c4404d)`(const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & _geoms,size_t _polygon_index)` | 
`public inline  `[`~PolygonPartition`](#classgeoda_1_1_polygon_partition_1a3af0f1f23a36fbd1a2ea706cf3b9be38)`()` | 
`public inline `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`GetPoint`](#classgeoda_1_1_polygon_partition_1aae2c86891e1b3d3692d6dccc7fda70e6)`(const int i)` | 
`public inline int `[`GetPart`](#classgeoda_1_1_polygon_partition_1ac2a98ced1cb97c51a118046ca24b4cd8)`(int i)` | 
`public inline double `[`GetMinX`](#classgeoda_1_1_polygon_partition_1abf2b359308ecfca32aa4c2c4e01e1d23)`()` | 
`public inline double `[`GetMinY`](#classgeoda_1_1_polygon_partition_1af1183c5bb6d36445fb6c9a44f0d87e2a)`()` | 
`public inline double `[`GetMaxX`](#classgeoda_1_1_polygon_partition_1ad3d4784a9052247cee22ec57f04089ba)`()` | 
`public inline double `[`GetMaxY`](#classgeoda_1_1_polygon_partition_1af2796a99863b9f662ecf4d0e04708d52)`()` | 
`public inline int `[`MakePartition`](#classgeoda_1_1_polygon_partition_1aa5640147ceddfd0b3ed0af4b0bde03fd)`(int mX,int mY)` | 
`public inline void `[`MakeSmallPartition`](#classgeoda_1_1_polygon_partition_1a0e406a09c8e686f6f009c72c12277e45)`(const int mX,const double Start,const double Stop)` | 
`public inline void `[`MakeNeighbors`](#classgeoda_1_1_polygon_partition_1aeff6f2abdde9b18f8414c7066f3d3002)`()` | 
`public inline bool `[`edge`](#classgeoda_1_1_polygon_partition_1a305aa2275ae021b8fc78a5ce72c54af4)`(`[`PolygonPartition`](#classgeoda_1_1_polygon_partition)` & p,const int host,const int guest,double precision_threshold)` | 
`public inline int `[`sweep`](#classgeoda_1_1_polygon_partition_1ad5a4bfc6afecec2885b2e97b2a8efe42)`(`[`PolygonPartition`](#classgeoda_1_1_polygon_partition)` & guest,bool is_queen,double precision_threshold)` | 
`protected const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & `[`geoms`](#classgeoda_1_1_polygon_partition_1ada90698c3027cc377bf990a48a96e4c4) | 
`protected size_t `[`polygon_index`](#classgeoda_1_1_polygon_partition_1a30fec504b722ce7005a74dfee2879937) | 
`protected `[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` `[`bbox`](#classgeoda_1_1_polygon_partition_1a7bd82914b25820662a3c416320d34a5d) | 
`protected `[`BasePartition`](./cpp/api-geoda::BasePartition.md#classgeoda_1_1_base_partition)` `[`pX`](#classgeoda_1_1_polygon_partition_1a69fcbef052127f103cc0b1e38adc5b6c) | 
`protected `[`PartitionP`](./cpp/api-geoda::PartitionP.md#classgeoda_1_1_partition_p)` `[`pY`](#classgeoda_1_1_polygon_partition_1af5075486c92b2bbf59512817eacdb0eb) | 
`protected int * `[`nbrPoints`](#classgeoda_1_1_polygon_partition_1ae86cf213780c5974ada02c9c3fe3d553) | 
`protected inline int `[`prev`](#classgeoda_1_1_polygon_partition_1ae4aa30d875e136b8117fefac04190365)`(const int pt) const` | 
`protected inline int `[`succ`](#classgeoda_1_1_polygon_partition_1a72b1be66f12b5effb299460aee1b040d)`(const int pt) const` | 

## Members

#### `public int `[`NumPoints`](#classgeoda_1_1_polygon_partition_1ac2775a5aa99d1bd9b90eeb52dfd49bc7) 

#### `public int `[`NumParts`](#classgeoda_1_1_polygon_partition_1a3309d498158ed08fdc35906fecc0e437) 

#### `public inline  explicit `[`PolygonPartition`](#classgeoda_1_1_polygon_partition_1a99e6b939494e6210b6d7b5fb77c4404d)`(const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & _geoms,size_t _polygon_index)` 

#### `public inline  `[`~PolygonPartition`](#classgeoda_1_1_polygon_partition_1a3af0f1f23a36fbd1a2ea706cf3b9be38)`()` 

#### `public inline `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`GetPoint`](#classgeoda_1_1_polygon_partition_1aae2c86891e1b3d3692d6dccc7fda70e6)`(const int i)` 

#### `public inline int `[`GetPart`](#classgeoda_1_1_polygon_partition_1ac2a98ced1cb97c51a118046ca24b4cd8)`(int i)` 

#### `public inline double `[`GetMinX`](#classgeoda_1_1_polygon_partition_1abf2b359308ecfca32aa4c2c4e01e1d23)`()` 

#### `public inline double `[`GetMinY`](#classgeoda_1_1_polygon_partition_1af1183c5bb6d36445fb6c9a44f0d87e2a)`()` 

#### `public inline double `[`GetMaxX`](#classgeoda_1_1_polygon_partition_1ad3d4784a9052247cee22ec57f04089ba)`()` 

#### `public inline double `[`GetMaxY`](#classgeoda_1_1_polygon_partition_1af2796a99863b9f662ecf4d0e04708d52)`()` 

#### `public inline int `[`MakePartition`](#classgeoda_1_1_polygon_partition_1aa5640147ceddfd0b3ed0af4b0bde03fd)`(int mX,int mY)` 

#### `public inline void `[`MakeSmallPartition`](#classgeoda_1_1_polygon_partition_1a0e406a09c8e686f6f009c72c12277e45)`(const int mX,const double Start,const double Stop)` 

#### `public inline void `[`MakeNeighbors`](#classgeoda_1_1_polygon_partition_1aeff6f2abdde9b18f8414c7066f3d3002)`()` 

#### `public inline bool `[`edge`](#classgeoda_1_1_polygon_partition_1a305aa2275ae021b8fc78a5ce72c54af4)`(`[`PolygonPartition`](#classgeoda_1_1_polygon_partition)` & p,const int host,const int guest,double precision_threshold)` 

#### `public inline int `[`sweep`](#classgeoda_1_1_polygon_partition_1ad5a4bfc6afecec2885b2e97b2a8efe42)`(`[`PolygonPartition`](#classgeoda_1_1_polygon_partition)` & guest,bool is_queen,double precision_threshold)` 

#### `protected const `[`GeometryCollection`](./cpp/api-geoda::GeometryCollection.md#classgeoda_1_1_geometry_collection)` & `[`geoms`](#classgeoda_1_1_polygon_partition_1ada90698c3027cc377bf990a48a96e4c4) 

#### `protected size_t `[`polygon_index`](#classgeoda_1_1_polygon_partition_1a30fec504b722ce7005a74dfee2879937) 

#### `protected `[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` `[`bbox`](#classgeoda_1_1_polygon_partition_1a7bd82914b25820662a3c416320d34a5d) 

#### `protected `[`BasePartition`](./cpp/api-geoda::BasePartition.md#classgeoda_1_1_base_partition)` `[`pX`](#classgeoda_1_1_polygon_partition_1a69fcbef052127f103cc0b1e38adc5b6c) 

#### `protected `[`PartitionP`](./cpp/api-geoda::PartitionP.md#classgeoda_1_1_partition_p)` `[`pY`](#classgeoda_1_1_polygon_partition_1af5075486c92b2bbf59512817eacdb0eb) 

#### `protected int * `[`nbrPoints`](#classgeoda_1_1_polygon_partition_1ae86cf213780c5974ada02c9c3fe3d553) 

#### `protected inline int `[`prev`](#classgeoda_1_1_polygon_partition_1ae4aa30d875e136b8117fefac04190365)`(const int pt) const` 

#### `protected inline int `[`succ`](#classgeoda_1_1_polygon_partition_1a72b1be66f12b5effb299460aee1b040d)`(const int pt) const` 

