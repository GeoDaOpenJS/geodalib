# class `geoda::GalElement` 

The weights structure to represent who is the neighbor of whom.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public bool `[`is_nbrAvgW_empty`](#classgeoda_1_1_gal_element_1af9b1d7f8cb7c13bf0a6e780d0ce9372f) | 
`public std::vector< double > `[`nbrAvgW`](#classgeoda_1_1_gal_element_1ac4d9413cdf78552ca4fea3531bb5f28f) | 
`public std::map< unsigned int, int > `[`nbrLookup`](#classgeoda_1_1_gal_element_1a0f411050dd9ee5283027024fcb830618) | 
`public int `[`idx`](#classgeoda_1_1_gal_element_1a20124618fe8e70daa42be9fc1436de62) | 
`public std::vector< unsigned int > `[`nbr`](#classgeoda_1_1_gal_element_1aeeda4ec538a092938ac9192510e6661a) | 
`public std::vector< double > `[`nbrWeight`](#classgeoda_1_1_gal_element_1a13aed228f5867f4ba15fb9382c18da03) | 
`public inline  `[`GalElement`](#classgeoda_1_1_gal_element_1a940550c4aff6930b85ee6384a2fdf16c)`()` | 
`public inline virtual  `[`~GalElement`](#classgeoda_1_1_gal_element_1a176c99a11a2d39b10a1c814e115f0a26)`()` | 
`public inline virtual size_t `[`Size`](#classgeoda_1_1_gal_element_1a9e32d1e75feb41f219804cbef680c2a1)`() const` | 
`public inline virtual const std::vector< unsigned int > & `[`GetNbrs`](#classgeoda_1_1_gal_element_1a25cfb78d1e60685e3f65fd756ab8b754)`() const` | 
`public inline virtual unsigned int `[`operator[]`](#classgeoda_1_1_gal_element_1ac61e2be4e8fab36fcf292f54c33bcb7d)`(size_t n) const` | 
`public inline void `[`SetSizeNbrs`](#classgeoda_1_1_gal_element_1a062a8436c7aa13ad72479e0e84933941)`(size_t sz,bool is_gal)` | 
`public inline void `[`SetNbr`](#classgeoda_1_1_gal_element_1a3c01c70b047ac2dbd712951b4f28bb60)`(size_t pos,unsigned int n)` | 
`public inline void `[`Print`](#classgeoda_1_1_gal_element_1a63abc9b2ccfa4b92fc169eaf741b815b)`() const` | 
`public inline void `[`SetNbr`](#classgeoda_1_1_gal_element_1a36556f3fd8d0b6c2a2f603e846e56102)`(size_t pos,unsigned int n,double w)` | 
`public inline void `[`SetNbrs`](#classgeoda_1_1_gal_element_1aaa1f3cda9314bbf3e305b2d38ef3f771)`(const `[`GalElement`](#classgeoda_1_1_gal_element)` & gal)` | 
`public inline const std::vector< double > & `[`GetNbrWeights`](#classgeoda_1_1_gal_element_1a525be8a4aed6d124434eb0eba71e7082)`() const` | 
`public inline void `[`SortNbrs`](#classgeoda_1_1_gal_element_1a0905933552d2419a73105c137f964188)`()` | 
`public inline void `[`ReverseNbrs`](#classgeoda_1_1_gal_element_1a85d7ff24f1822da3028216398a47cb67)`()` | 
`public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1a5688f75d9bd223ffd215d715f149b21a)`(const std::vector< double > & x) const` | 
`public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1a27fc3d5ffe16b55dba78bdeab4e6ce40)`(const double * x) const` | 
`public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1aff01167e47be9632b19cbf4925f35cc3)`(const std::vector< double > & x,const int * perm) const` | 
`public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1aae9ae7ddd6ec6e7721b82682b3e7f943)`(const double * x,bool is_binary,int self_id) const` | 
`public inline double `[`GetRW`](#classgeoda_1_1_gal_element_1abd87a174cd6b72fca44cc62bff51c166)`(int idx)` | 
`public inline bool `[`Check`](#classgeoda_1_1_gal_element_1ae6fbe21f7bece5bfa74d485069767a26)`(unsigned int nbrIdx)` | 
`public inline void `[`Update`](#classgeoda_1_1_gal_element_1abbe8626aa7c7fc09099eaef1c6ff5d89)`(const std::vector< bool > & undefs)` | 

## Members

#### `public bool `[`is_nbrAvgW_empty`](#classgeoda_1_1_gal_element_1af9b1d7f8cb7c13bf0a6e780d0ce9372f) 

#### `public std::vector< double > `[`nbrAvgW`](#classgeoda_1_1_gal_element_1ac4d9413cdf78552ca4fea3531bb5f28f) 

#### `public std::map< unsigned int, int > `[`nbrLookup`](#classgeoda_1_1_gal_element_1a0f411050dd9ee5283027024fcb830618) 

#### `public int `[`idx`](#classgeoda_1_1_gal_element_1a20124618fe8e70daa42be9fc1436de62) 

#### `public std::vector< unsigned int > `[`nbr`](#classgeoda_1_1_gal_element_1aeeda4ec538a092938ac9192510e6661a) 

#### `public std::vector< double > `[`nbrWeight`](#classgeoda_1_1_gal_element_1a13aed228f5867f4ba15fb9382c18da03) 

#### `public inline  `[`GalElement`](#classgeoda_1_1_gal_element_1a940550c4aff6930b85ee6384a2fdf16c)`()` 

#### `public inline virtual  `[`~GalElement`](#classgeoda_1_1_gal_element_1a176c99a11a2d39b10a1c814e115f0a26)`()` 

#### `public inline virtual size_t `[`Size`](#classgeoda_1_1_gal_element_1a9e32d1e75feb41f219804cbef680c2a1)`() const` 

#### `public inline virtual const std::vector< unsigned int > & `[`GetNbrs`](#classgeoda_1_1_gal_element_1a25cfb78d1e60685e3f65fd756ab8b754)`() const` 

#### `public inline virtual unsigned int `[`operator[]`](#classgeoda_1_1_gal_element_1ac61e2be4e8fab36fcf292f54c33bcb7d)`(size_t n) const` 

#### `public inline void `[`SetSizeNbrs`](#classgeoda_1_1_gal_element_1a062a8436c7aa13ad72479e0e84933941)`(size_t sz,bool is_gal)` 

#### `public inline void `[`SetNbr`](#classgeoda_1_1_gal_element_1a3c01c70b047ac2dbd712951b4f28bb60)`(size_t pos,unsigned int n)` 

#### `public inline void `[`Print`](#classgeoda_1_1_gal_element_1a63abc9b2ccfa4b92fc169eaf741b815b)`() const` 

#### `public inline void `[`SetNbr`](#classgeoda_1_1_gal_element_1a36556f3fd8d0b6c2a2f603e846e56102)`(size_t pos,unsigned int n,double w)` 

#### `public inline void `[`SetNbrs`](#classgeoda_1_1_gal_element_1aaa1f3cda9314bbf3e305b2d38ef3f771)`(const `[`GalElement`](#classgeoda_1_1_gal_element)` & gal)` 

#### `public inline const std::vector< double > & `[`GetNbrWeights`](#classgeoda_1_1_gal_element_1a525be8a4aed6d124434eb0eba71e7082)`() const` 

#### `public inline void `[`SortNbrs`](#classgeoda_1_1_gal_element_1a0905933552d2419a73105c137f964188)`()` 

#### `public inline void `[`ReverseNbrs`](#classgeoda_1_1_gal_element_1a85d7ff24f1822da3028216398a47cb67)`()` 

#### `public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1a5688f75d9bd223ffd215d715f149b21a)`(const std::vector< double > & x) const` 

#### `public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1a27fc3d5ffe16b55dba78bdeab4e6ce40)`(const double * x) const` 

#### `public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1aff01167e47be9632b19cbf4925f35cc3)`(const std::vector< double > & x,const int * perm) const` 

#### `public inline double `[`SpatialLag`](#classgeoda_1_1_gal_element_1aae9ae7ddd6ec6e7721b82682b3e7f943)`(const double * x,bool is_binary,int self_id) const` 

#### `public inline double `[`GetRW`](#classgeoda_1_1_gal_element_1abd87a174cd6b72fca44cc62bff51c166)`(int idx)` 

#### `public inline bool `[`Check`](#classgeoda_1_1_gal_element_1ae6fbe21f7bece5bfa74d485069767a26)`(unsigned int nbrIdx)` 

#### `public inline void `[`Update`](#classgeoda_1_1_gal_element_1abbe8626aa7c7fc09099eaef1c6ff5d89)`(const std::vector< bool > & undefs)` 

