---
outline: deep
---

# API References


## Mapping


### Basic Mapping

- [Quantile Map](/api/core/src/functions/quantileBreaks)
- [Natural Breaks (Jenks)](/api/core/src/functions/naturalBreaks)
- [Equal Intervals](/api/core/src/functions/equalIntervalBreaks)
- [Percentile](/api/core/src/functions/percentileBreaks)
- [Box Breaks (hinge = 1.5)](/api/core/src/functions/hinge15Breaks)
- [Box Breaks (hinge = 3.0)](/api/core/src/functions/hinge30Breaks)
- [Standard Deviation Map](/api/core/src/functions/standardDeviationBreaks)

### Rate Mapping

- [Excess Risk](/api/core/src/functions/excessRisk)
- [Empirical Bayes](/api/core/src/functions/empiricalBayes)
- [Spatial Rate](/api/core/src/functions/spatialRate)
- [Spatial Empirical Bayes](/api/core/src/functions/spatialEmpiricalBayes)

### Cartogram

- Cartogram



## Data Exploration

- [Standardization](/api/functions/standardization)
- [MAD](/api/functions/mad)
- [PCA](/api/functions/pca)
- [Diff-in-Diff](/api/functions/diff-in-diff)
- [Spatial Lagged Variable](/api/functions/spatialLag)



## Spatial Weights


### Contiguity Weights

- [Queen Weights](/api/functions/queenWeights)
- [Rook Weights](/api/functions/rookWeights)

### Distance Weights

- [Min Distance Threshold](/api/functions/minDistanceThreshold)
- [K-Nearest Neighbors](/api/functions/kNearestNeighbors)
- [Distance based Weights](/api/functions/distanceBasedWeights)

### Kernel Weights

- [Kernel Weights](/api/functions/kernelWeights)
- [Kernel K-Nearest Neighbors Weights](/api/functions/kernelKNearestNeighbors)



## Spatial Autocorrelation Analysis


### Global Spatial Autocorrelation

- [Moran's I](/api/functions/moransI)

### Local Spatial Autocorrelation

- [Local Moran's I](/api/functions/localMoransI)
- [Local Getis-Ord Gi*](/api/functions/localGetisOrdGiStar)
- [Local Geary's C](/api/functions/localGearysC)
- [Local Join Count](/api/functions/localJoinCount)
- [Quantile LISA](/api/functions/quantileLISA)



## Spatial Clustering


### Non-Spatial Clustering

- [PCA](/api/functions/pca)
- [MDS](/api/functions/mds)
- [t-SNE](/api/functions/t-SNE)
- [k-Means](/api/functions/kmeans)
- [k-Medians](/api/functions/kmedians)
- [k-Medoids](/api/functions/kmedoids)
- [Spectral Clustering](/api/functions/spectralClustering)
- [Hierarchical Clustering](/api/functions/hierarchicalClustering)

### Spatial Constrained Clustering

- [DBSCAN](/api/functions/dbscan)
- [HDBSCAN](/api/functions/hdbscan)
- [Spatial K-Clusters](/api/functions/spatialKClusters)
- [Spatial Constrained Hierarchical Clustering](/api/functions/schc)

### Spatial Clustering

- [SKATER](/api/functions/skater)
- [REDCAP](/api/functions/redcap)
- [AZP](/api/functions/azp)
- [Max-p](/api/functions/max-p)



## Spatial Regression

- [OLS Regression](/api/functions/classicRegression)
- [Spatial Lag Model](/api/functions/spatialLag)
- [Spatial Error Model](/api/functions/spatialError)



## Spatial Operations


### Geometric Operations

- [Centroid](/api/functions/centroid)
- [Buffer](/api/functions/buffer)
- [Convex Hull](/api/functions/convexHull)
- [Spatial Dissolve](/api/functions/dissolve)
- [Spatial Join](/api/functions/spatialJoin)

### Other Operations

- [Voronoi](/api/functions/voronoi)


