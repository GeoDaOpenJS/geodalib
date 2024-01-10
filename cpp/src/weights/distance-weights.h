

#ifndef GEODA_DISTANCE_WEIGHTS_H
#define GEODA_DISTANCE_WEIGHTS_H
#include <vector>

#include "../features/geometry-collection.h"

namespace geoda {

// haversine_distance ref: https://www.movable-type.co.uk/scripts/latlong.html
const double pi = 3.141592653589793238463;

// make the following 2 values smaller so we have a buffer when searching
const double mile_per_degree = 69.0;
const double km_per_degree = 111.1;

const double pi_over_180 = pi / 180.0;

const double earth_radius_km = 6371.007180918475;

const double earth_radius_miles = earth_radius_km / 1.609344;

double haversine_distance(double lon1, double lat1, double lon2, double lat2, bool is_mile);

/**
 * distance-based weights
 */
std::vector<std::vector<unsigned int>> distance_weights(const GeometryCollection& geoms, double distance_threshold,
                                                        bool is_mile);

/**
 *  get distance threshold values:
 *  1. the min distance to one nearest neighbor
 *  2. the max distance to one nearest neighbor, which guarantees at least one neighbor
 *  3. the approximate max pair distance
 *  The 1st and 3rd values are used to define the range of distance thresholds
 *  The 2nd value is used as suggested distance threshold
 */
std::vector<double> get_distance_thresholds(const GeometryCollection& geoms, bool is_mile);

}  // namespace geoda
#endif  // GEODA_DISTANCE_WEIGHTS_H
