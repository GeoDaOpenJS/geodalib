# class `geoda::GeometryCollection` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::vector< double > `[`x`](#classgeoda_1_1_geometry_collection_1aa4b142edec07a60c3ccebebd75ec1807) | 
`public std::vector< double > `[`y`](#classgeoda_1_1_geometry_collection_1a21cd35c83e2c8f83c3cd9ca918a39d76) | 
`public std::vector< unsigned int > `[`parts`](#classgeoda_1_1_geometry_collection_1a6b093922e9b1b191b4c2f865e030e067) | 
`public std::vector< unsigned int > `[`sizes`](#classgeoda_1_1_geometry_collection_1ae918c6023877c8b4b0d4b2cae0cd44d7) | 
`public bool `[`convert_to_UTM`](#classgeoda_1_1_geometry_collection_1a10e7706e4dfc1099ceff90f360577ac0) | 
`public std::vector< std::string > `[`utm_zones`](#classgeoda_1_1_geometry_collection_1a110398f22f06869c071a09117788e009) | 
`public  `[`GeometryCollection`](#classgeoda_1_1_geometry_collection_1a9ff03fbaedb0cd610d2ac321d6dec5c3)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & sizes,bool convert_to_UTM)` | 
`public virtual  `[`~GeometryCollection`](#classgeoda_1_1_geometry_collection_1a369be05641ef601eab34eae7f5393e51)`() = default` | 
`public void `[`ConvertToUTM`](#classgeoda_1_1_geometry_collection_1a51291eebb1d1165f78cdee56f317afcb)`(int index,double lat,double lng,double & north,double & east)` | 
`public inline size_t `[`size`](#classgeoda_1_1_geometry_collection_1ac84ddf06ab4559e822276f376a24f41f)`() const` | 
`public inline bool `[`empty`](#classgeoda_1_1_geometry_collection_1a0d8bf03dd9b0edf9d6bfb740eebe4f51)`() const` | 
`public inline virtual `[`multipoint_type`](./cpp/api-multipoint_type.md#geometry_8h_1adabc488e138eb16d35bb5ab9437ed3e2)` `[`get_point`](#classgeoda_1_1_geometry_collection_1a56aaceca9602b4488fb7d12274429482)`(size_t i) const` | 
`public inline virtual `[`multiline_type`](./cpp/api-multiline_type.md#geometry_8h_1a4cace7380b22e2b7925d0b7f9847d782)` `[`get_line`](#classgeoda_1_1_geometry_collection_1aeaa895db6128cadaf3ff09cf1f6322a0)`(size_t i) const` | 
`public inline virtual `[`multipolygon_type`](./cpp/api-multipolygon_type.md#geometry_8h_1ad9cc59b99ad17c2cd9f79fd375e88752)` `[`get_polygon`](#classgeoda_1_1_geometry_collection_1a5b9f32aaad9f327cd471da16d552c904)`(size_t i) const` | 
`public bool `[`intersect`](#classgeoda_1_1_geometry_collection_1a53b589cda146cc12876b8a616062ccdf)`(size_t i,const `[`GeometryCollection`](#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` | 
`public void `[`get_bbox`](#classgeoda_1_1_geometry_collection_1a3e6ecea3fd57812663972ef52119ca18)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` | 
`public `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_geometry_collection_1a1fb5568413e4c69d931233591a5906f2)`() const` | 
`public std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_geometry_collection_1a68d401e4a2a61c43820b06d2d9d854b4)`() const` | 
`public `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_geometry_collection_1ad1e00066be731ae77452566bd0214b56)`(size_t i) const` | 
`public inline virtual int `[`get_part`](#classgeoda_1_1_geometry_collection_1aab3968b3c18f6aba035b3a74f5f361d0)`(size_t geom_index,size_t part_index) const` | 
`public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_point`](#classgeoda_1_1_geometry_collection_1a0b80b51bc498fd1e9942380d77300581)`(size_t geom_index,size_t point_index) const` | 
`public inline virtual size_t `[`get_num_parts`](#classgeoda_1_1_geometry_collection_1a39fd26b2796c636e0b7913640e1b0076)`(size_t geom_index) const` | 
`public inline virtual size_t `[`get_num_points`](#classgeoda_1_1_geometry_collection_1a7451e84dee62efec3756bdab2f04fe89)`(size_t geom_index) const` | 

## Members

#### `public std::vector< double > `[`x`](#classgeoda_1_1_geometry_collection_1aa4b142edec07a60c3ccebebd75ec1807) 

#### `public std::vector< double > `[`y`](#classgeoda_1_1_geometry_collection_1a21cd35c83e2c8f83c3cd9ca918a39d76) 

#### `public std::vector< unsigned int > `[`parts`](#classgeoda_1_1_geometry_collection_1a6b093922e9b1b191b4c2f865e030e067) 

#### `public std::vector< unsigned int > `[`sizes`](#classgeoda_1_1_geometry_collection_1ae918c6023877c8b4b0d4b2cae0cd44d7) 

#### `public bool `[`convert_to_UTM`](#classgeoda_1_1_geometry_collection_1a10e7706e4dfc1099ceff90f360577ac0) 

#### `public std::vector< std::string > `[`utm_zones`](#classgeoda_1_1_geometry_collection_1a110398f22f06869c071a09117788e009) 

#### `public  `[`GeometryCollection`](#classgeoda_1_1_geometry_collection_1a9ff03fbaedb0cd610d2ac321d6dec5c3)`(const std::vector< double > & x,const std::vector< double > & y,const std::vector< unsigned int > & parts,const std::vector< unsigned int > & sizes,bool convert_to_UTM)` 

#### `public virtual  `[`~GeometryCollection`](#classgeoda_1_1_geometry_collection_1a369be05641ef601eab34eae7f5393e51)`() = default` 

#### `public void `[`ConvertToUTM`](#classgeoda_1_1_geometry_collection_1a51291eebb1d1165f78cdee56f317afcb)`(int index,double lat,double lng,double & north,double & east)` 

#### `public inline size_t `[`size`](#classgeoda_1_1_geometry_collection_1ac84ddf06ab4559e822276f376a24f41f)`() const` 

#### `public inline bool `[`empty`](#classgeoda_1_1_geometry_collection_1a0d8bf03dd9b0edf9d6bfb740eebe4f51)`() const` 

#### `public inline virtual `[`multipoint_type`](./cpp/api-multipoint_type.md#geometry_8h_1adabc488e138eb16d35bb5ab9437ed3e2)` `[`get_point`](#classgeoda_1_1_geometry_collection_1a56aaceca9602b4488fb7d12274429482)`(size_t i) const` 

#### `public inline virtual `[`multiline_type`](./cpp/api-multiline_type.md#geometry_8h_1a4cace7380b22e2b7925d0b7f9847d782)` `[`get_line`](#classgeoda_1_1_geometry_collection_1aeaa895db6128cadaf3ff09cf1f6322a0)`(size_t i) const` 

#### `public inline virtual `[`multipolygon_type`](./cpp/api-multipolygon_type.md#geometry_8h_1ad9cc59b99ad17c2cd9f79fd375e88752)` `[`get_polygon`](#classgeoda_1_1_geometry_collection_1a5b9f32aaad9f327cd471da16d552c904)`(size_t i) const` 

#### `public bool `[`intersect`](#classgeoda_1_1_geometry_collection_1a53b589cda146cc12876b8a616062ccdf)`(size_t i,const `[`GeometryCollection`](#classgeoda_1_1_geometry_collection)` & join_geoms,size_t j) const` 

#### `public void `[`get_bbox`](#classgeoda_1_1_geometry_collection_1a3e6ecea3fd57812663972ef52119ca18)`(size_t i,`[`box_type`](./cpp/api-box_type.md#geometry_8h_1a7d32eb4d5272ffdaf1a4c210691779fb)` & box) const` 

#### `public `[`ShapeType`](./cpp/api-ShapeType.md#namespacegeoda_1a20fd16562e89848c50247b0d9c865348)` `[`get_type`](#classgeoda_1_1_geometry_collection_1a1fb5568413e4c69d931233591a5906f2)`() const` 

#### `public std::vector< std::vector< double > > `[`get_centroids`](#classgeoda_1_1_geometry_collection_1a68d401e4a2a61c43820b06d2d9d854b4)`() const` 

#### `public `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_centroid`](#classgeoda_1_1_geometry_collection_1ad1e00066be731ae77452566bd0214b56)`(size_t i) const` 

#### `public inline virtual int `[`get_part`](#classgeoda_1_1_geometry_collection_1aab3968b3c18f6aba035b3a74f5f361d0)`(size_t geom_index,size_t part_index) const` 

#### `public inline virtual `[`point_type`](./cpp/api-point_type.md#geometry_8h_1a4955b56f005be86f2d38486958dba53b)` `[`get_point`](#classgeoda_1_1_geometry_collection_1a0b80b51bc498fd1e9942380d77300581)`(size_t geom_index,size_t point_index) const` 

#### `public inline virtual size_t `[`get_num_parts`](#classgeoda_1_1_geometry_collection_1a39fd26b2796c636e0b7913640e1b0076)`(size_t geom_index) const` 

#### `public inline virtual size_t `[`get_num_points`](#classgeoda_1_1_geometry_collection_1a7451e84dee62efec3756bdab2f04fe89)`(size_t geom_index) const` 

