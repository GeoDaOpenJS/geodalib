

#include "weights/distance-weights.h"

#include <limits>
#include <utility>
#include <vector>

#include "features/geometry.h"

namespace bg = boost::geometry;
typedef std::pair<point_type, unsigned> point_val;

namespace bgi = boost::geometry::index;
typedef bgi::rtree<point_val, bgi::quadratic<32>> rtree_point_t;

using namespace geoda;

double geoda::haversine_distance(double lon1, double lat1, double lon2, double lat2, bool is_mile) {
  double sin_delta_phi = sin((lat2 - lat1) * pi_over_180 / 2.0);
  double sin_delta_lambda = sin((lon2 - lon1) * pi_over_180 / 2.0);

  double a = sin_delta_phi * sin_delta_phi +
             cos(lat1 * pi_over_180) * cos(lat2 * pi_over_180) * sin_delta_lambda * sin_delta_lambda;
  double c = 2.0 * atan2(sqrt(a), sqrt(1.0 - a));

  return is_mile ? earth_radius_miles * c : earth_radius_km * c;
}

std::vector<std::vector<unsigned int>> geoda::distance_weights(const GeometryCollection& geoms,
                                                                double distance_threshold, bool is_mile) {
  // create rtree
  std::vector<point_val> pts;
  size_t num_geoms = geoms.size();
  for (size_t i = 0; i < num_geoms; ++i) {
    point_type pt;
    geoms.get_centroid(i, pt);
    pts.emplace_back(pt, i);
  }
  rtree_point_t rtree(pts);

  std::vector<std::vector<unsigned int>> result(num_geoms);

  // visit all element in rtree
  for (rtree_point_t::const_query_iterator it = rtree.qbegin(bgi::intersects(rtree.bounds())); it != rtree.qend();
       ++it) {
    const point_val& v = *it;
    size_t orig_idx = v.second;

    // convert distance_threshold to degree
    double distance_threshold_deg = distance_threshold / (is_mile ? mile_per_degree : km_per_degree);

    // create bbox using distance_threshold
    double x = v.first.get<0>();
    double y = v.first.get<1>();
    box_type b(point_type(x - distance_threshold_deg, y - distance_threshold_deg),
               point_type(x + distance_threshold_deg, y + distance_threshold_deg));

    // each point "v" with index "obs"
    std::vector<point_val> q;
    rtree.query(bgi::intersects(b), std::back_inserter(q));

    for (auto& nbr : q) {
      if (nbr.second == v.second) {
        continue;
      }
      double x1 = nbr.first.get<0>();
      double y1 = nbr.first.get<1>();
      double d = haversine_distance(x, y, x1, y1, is_mile);
      if (d <= distance_threshold) {
        result[orig_idx].push_back(nbr.second);
      }
    }
  }

  return result;
}

std::vector<double> geoda::get_distance_thresholds(const GeometryCollection& geoms, bool is_mile) {
  std::vector<point_val> pts;
  size_t num_geoms = geoms.size();
  for (size_t i = 0; i < num_geoms; ++i) {
    point_type pt;
    geoms.get_centroid(i, pt);
    pts.emplace_back(pt, i);
  }
  rtree_point_t rtree(pts);

  // get min and max distance from each geometry to its nearest neighbor
  double min_1nn_distance = std::numeric_limits<double>::max();
  double max_1nn_distance = 0;
  bg::model::box<bg::model::point<double, 2UL, bg::cs::cartesian>> bbox = rtree.bounds();
  double max_pair_distance = haversine_distance(bbox.min_corner().get<0>(), bbox.min_corner().get<1>(),
                                                bbox.max_corner().get<0>(), bbox.max_corner().get<1>(), is_mile);

  // boost::nearest() search is self-included
  const int k = 2;
  for (rtree_point_t::const_query_iterator it = rtree.qbegin(bgi::intersects(bbox)); it != rtree.qend(); ++it) {
    const point_val& v = *it;
    std::vector<point_val> q;
    rtree.query(bgi::nearest(v.first, k), std::back_inserter(q));

    double x = v.first.get<0>();
    double y = v.first.get<1>();

    for (auto& nbr : q) {
      if (nbr.second == v.second) {
        continue;
      }
      double x1 = nbr.first.get<0>();
      double y1 = nbr.first.get<1>();
      double d = haversine_distance(x, y, x1, y1, is_mile);
      if (d < min_1nn_distance) {
        min_1nn_distance = d;
      }
      if (d > max_1nn_distance) {
        max_1nn_distance = d;
      }
    }
  }
  if (min_1nn_distance == std::numeric_limits<double>::max()) {
    min_1nn_distance = 0;
    max_pair_distance = 0;
  }
  return std::vector<double>{min_1nn_distance, max_1nn_distance, max_pair_distance};
}
