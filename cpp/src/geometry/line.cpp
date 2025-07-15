// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include "geometry/line.h"

#include <algorithm>
#include <vector>

#include "geometry/polygon.h"
#include "utils/UTM.h"

using namespace geoda;

void Line::add(const std::vector<double>& in_x, const std::vector<double>& in_y) {
  if (in_x.size() == in_y.size()) {
    parts.push_back(parts.empty() ? 0 : x.size());
    std::copy(in_x.begin(), in_x.end(), std::back_inserter(x));
    std::copy(in_y.begin(), in_y.end(), std::back_inserter(y));
  }
}

LineCollection::LineCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                               const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                               bool convert_to_UTM)
    : GeometryCollection(in_x, in_y, parts, sizes, convert_to_UTM) {
  int num_points = x.size();
  int num_lines = sizes.size();
  int num_all_parts = parts.size();
  int part_index = 0;

  double north, east;
  utm_zones.resize(num_lines);

  for (int i = 0; i < num_lines; ++i) {
    // extract and create multiline_type
    multiline_type boost_line;
    int num_parts = sizes[i];
    for (int j = part_index; j < part_index + num_parts; ++j) {
      int start = parts[j];
      int end = j == num_all_parts - 1 ? num_points : parts[j + 1];
      line_type boost_l;
      for (int k = start; k < end; ++k) {
        double lat = y[k], lng = x[k];
        if (convert_to_UTM) {
          ConvertToUTM(i, lat, lng, north, east);
          lat = north;
          lng = east;
        }
        bg::append(boost_l, point_type(lng, lat));
      }
      boost_line.push_back(boost_l);
    }
    // offset the index to visit parts[]: an empty polygon (num_parts==0) should offset 1
    int offset_part = num_parts == 0 ? 1 : num_parts;
    part_index += offset_part;
    lines.push_back(boost_line);
  }
}

std::vector<std::vector<double>> LineCollection::get_centroids() const {
  std::vector<std::vector<double>> centroids(lines.size());
  for (size_t i = 0; i < lines.size(); ++i) {
    point_type pt;
    bg::centroid(lines[i], pt);
    centroids[i].push_back(bg::get<0>(pt));
    centroids[i].push_back(bg::get<1>(pt));
  }
  return centroids;
}

Polygon LineCollection::buffer(size_t i, double buffer_distance, int points_per_circle) const {
  multipolygon_type result;
  const multiline_type& multi_line = get_line(i);

  typedef double coordinate_type;
  boost::geometry::strategy::buffer::distance_symmetric<coordinate_type> distance_strategy(buffer_distance);
  boost::geometry::strategy::buffer::join_round join_strategy(points_per_circle);
  boost::geometry::strategy::buffer::end_round end_strategy(points_per_circle);
  boost::geometry::strategy::buffer::point_circle circle_strategy(points_per_circle);
  boost::geometry::strategy::buffer::side_straight side_strategy;

  boost::geometry::buffer(multi_line, result, distance_strategy, side_strategy, join_strategy, end_strategy,
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

