#ifndef GEODA_DISTANCE_WEIGHTS_H
#define GEODA_DISTANCE_WEIGHTS_H
#include <vector>

#include "geometry/geometry.h"

namespace geoda {

const double pi = 3.141592653589793238463;
const double mile_per_degree = 69.0;
const double km_per_degree = 111.1;
const double pi_over_180 = pi / 180.0;
const double earth_radius_km = 6371.007180918475;
const double earth_radius_miles = earth_radius_km / 1.609344;

// https://www.movable-type.co.uk/scripts/latlong.html
double haversine_distance(double lon1, double lat1, double lon2, double lat2, bool is_mile);

std::vector<std::vector<unsigned int>> distance_weights(const GeometryCollection& geoms, double distance_threshold,
                                                        bool is_mile);

std::vector<double> get_distance_thresholds(const GeometryCollection& geoms, bool is_mile);

std::vector<std::vector<unsigned int>> knearest_neighbors(const GeometryCollection& geoms, unsigned int k);

}  // namespace geoda
#endif  // GEODA_DISTANCE_WEIGHTS_H
