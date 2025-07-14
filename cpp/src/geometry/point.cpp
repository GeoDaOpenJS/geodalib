// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include "geometry/point.h"

#include <sstream>
#include <vector>

#include "geometry/geometry.h"
#include "geometry/polygon.h"
#include "utils/UTM.h"

using namespace geoda;

void Point::add(double in_x, double in_y) {
  x.push_back(in_x);
  y.push_back(in_y);
}

point_type PolygonCollection::get_point(size_t polygon_index, size_t point_index) const {
  point_type pt;
  int num_parts = sizes[polygon_index];
  int part_offset = 0;
  for (int i = 0; i < polygon_index; ++i) {
    // an empty polygon (num_parts==0) should offset 1
    int offset_part = sizes[i] == 0 ? 1 : sizes[i];
    part_offset += offset_part;
  }
  int start = parts[part_offset];
  int k = point_index + start;
  double lat = y[k], lng = x[k];
  pt.set<0>(lng);
  pt.set<1>(lat);
  return pt;
}

PointCollection::PointCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                 const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                                 bool convert_to_UTM)
    : GeometryCollection(in_x, in_y, parts, sizes, convert_to_UTM) {
  int num_points = x.size();
  int num_parts = parts.size();

  double north, east;
  utm_zones.resize(num_parts);

  for (int i = 0; i < num_parts; ++i) {
    // extract and create multipoint_type
    multipoint_type boost_point;
    int start = parts[i];
    int end = i == num_parts - 1 ? num_points : parts[i + 1];
    for (int k = start; k < end; ++k) {
      double lat = y[k], lng = x[k];
      if (convert_to_UTM) {
        ConvertToUTM(i, lat, lng, north, east);
        lat = north;
        lng = east;
      }
      point_type boost_p(lng, lat);
      boost_point.push_back(boost_p);
    }
    points.push_back(boost_point);
  }
}

std::vector<std::vector<double>> PointCollection::get_centroids() const {
  std::vector<std::vector<double>> centroids(points.size());
  for (size_t i = 0; i < points.size(); ++i) {
    point_type pt;
    bg::centroid(points[i], pt);
    centroids[i].push_back(bg::get<0>(pt));
    centroids[i].push_back(bg::get<1>(pt));
  }
  return centroids;
}

Polygon PointCollection::buffer(size_t i, double buffer_distance, int points_per_circle) const {
  multipolygon_type result;
  const multipoint_type& multi_point = get_point(i);

  typedef double coordinate_type;
  boost::geometry::strategy::buffer::distance_symmetric<coordinate_type> distance_strategy(buffer_distance);
  boost::geometry::strategy::buffer::join_round join_strategy(points_per_circle);
  boost::geometry::strategy::buffer::end_round end_strategy(points_per_circle);
  boost::geometry::strategy::buffer::point_circle circle_strategy(points_per_circle);
  boost::geometry::strategy::buffer::side_straight side_strategy;

  boost::geometry::buffer(multi_point, result, distance_strategy, side_strategy, join_strategy, end_strategy,
                          circle_strategy);

  Polygon buffer_polygon;
  for (auto& poly : result) {
    std::vector<double> xs, ys;
    for (auto it = boost::begin(boost::geometry::exterior_ring(poly));
         it != boost::end(boost::geometry::exterior_ring(poly)); ++it) {
      double x = bg::get<0>(*it);
      double y = bg::get<1>(*it);
      double lat = y, lng = x;
      if (convert_to_UTM) {
        UTM::UTMtoLL(y, x, utm_zones[i].c_str(), lat, lng);
      }
      xs.push_back(lng);
      ys.push_back(lat);
    }
    buffer_polygon.add(xs, ys, false);
  }
  return buffer_polygon;
}
