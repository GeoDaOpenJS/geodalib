

#ifndef GEODA_OPERATIONS_H
#define GEODA_OPERATIONS_H

#include <vector>

#include "../features/geometry-collection.h"

namespace geoda {
/**
 * Count how many points in each polygon
 */
std::vector<unsigned int> spatial_count(const PolygonCollection& polys, const PointCollection& points);

/**
 * Spatial union a collection of polygons (multi-polygons) into a single polygon
 */
Polygon spatial_union(const PolygonCollection& polys);

/**
 * Spatial join on input geometres joining with join geometries
 */
std::vector<std::vector<unsigned int>> spatial_join(const GeometryCollection& input_geoms,
                                                    const GeometryCollection& join_geoms,
                                                    SpatialJoinType join_operation);

/**
 * Get centroids for input polygons
 */
std::vector<std::vector<double>> get_centroids(const GeometryCollection& polygons);
}  // namespace geoda
#endif  // GEODA_OPERATIONS_H
