#include "geometry/polygon.h"

#include <algorithm>
#include <sstream>
#include <vector>

#include "utils/UTM.h"

using namespace geoda;

void Polygon::add(const std::vector<double>& in_x, const std::vector<double>& in_y, bool is_hole) {
  if (in_x.size() == in_y.size()) {
    parts.push_back(parts.empty() ? 0 : x.size());
    std::copy(in_x.begin(), in_x.end(), std::back_inserter(x));
    std::copy(in_y.begin(), in_y.end(), std::back_inserter(y));
    holes.push_back(is_hole);
  }
}

void Polygon::copy(const Polygon& poly) {
  std::copy(poly.x.begin(), poly.x.end(), std::back_inserter(x));
  std::copy(poly.y.begin(), poly.y.end(), std::back_inserter(y));
  std::copy(poly.parts.begin(), poly.parts.end(), std::back_inserter(parts));
  std::copy(poly.holes.begin(), poly.holes.end(), std::back_inserter(holes));
}

PolygonCollection::PolygonCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                     const std::vector<unsigned int>& parts, const std::vector<unsigned int>& holes,
                                     const std::vector<unsigned int>& sizes, bool fix_polygon, bool convert_to_UTM)
    : GeometryCollection(in_x, in_y, parts, sizes, convert_to_UTM), holes(holes) {
  int num_points = x.size();
  int num_polys = sizes.size();
  int num_all_parts = parts.size();
  int part_index = 0;

  double north, east;
  utm_zones.resize(num_polys);

  for (int i = 0; i < num_polys; ++i) {
    multipolygon_type boost_mp;
    int num_parts = sizes[i];
    int inner_parts = 0;
    for (int j = part_index; j < part_index + num_parts; ++j) {
      int start = parts[j];
      int end = j == num_all_parts - 1 ? num_points : parts[j + 1];
      bool is_hole = holes[j];
      if (!is_hole) {
        polygon_type boost_p;
        for (int k = start; k < end; ++k) {
          double lat = y[k], lng = x[k];
          if (convert_to_UTM) {
            ConvertToUTM(i, lat, lng, north, east);
            lat = north;
            lng = east;
          }
          bg::append(boost_p.outer(), point_type(lng, lat));
        }
        boost_mp.push_back(boost_p);
        inner_parts = 0;
      } else {
        inner_parts += 1;
        polygon_type& tmp_poly = boost_mp.back();
        tmp_poly.inners().resize(inner_parts);
        for (int k = start; k < end; ++k) {
          double lat = y[k], lng = x[k];
          if (convert_to_UTM) {
            ConvertToUTM(i, lat, lng, north, east);
            lat = north;
            lng = east;
          }
          bg::append(tmp_poly.inners().back(), point_type(lng, lat));
        }
      }
    }
    // offset the index to visit parts[]: an empty polygon (num_parts==0) should offset 1
    int offset_part = num_parts == 0 ? 1 : num_parts;
    part_index += offset_part;
    if (fix_polygon) {
      bg::correct(boost_mp);
    }
    polygons.push_back(boost_mp);
  }
}

void PolygonCollection::get_polygon(size_t polygon_index, Polygon& poly) {
  int num_parts = sizes[polygon_index];

  // get offset_part for the i-th polygon
  int part_index = 0;
  for (int i = 0; i < polygon_index; ++i) {
    int offset_part = num_parts == 0 ? 1 : sizes[i];
    part_index += offset_part;
  }

  double north, east;

  for (int j = part_index; j < part_index + num_parts; ++j) {
    int start = parts[j];
    int end = j == parts.size() - 1 ? x.size() : parts[j + 1];
    for (int k = start; k < end; ++k) {
      double lat = y[k], lng = x[k];
      if (convert_to_UTM) {
        ConvertToUTM(polygon_index, lat, lng, north, east);
        lat = north;
        lng = east;
      }
      poly.x.push_back(lng);
      poly.y.push_back(lat);
    }
    poly.parts.push_back(poly.parts.empty() ? 0 : poly.x.size());
    poly.holes.push_back(holes[j]);
  }
}

int PolygonCollection::get_part(size_t polygon_index, size_t part_index) const {
  int part_offset = 0;
  for (int i = 0; i < polygon_index; ++i) {
    // an empty polygon (num_parts==0) should offset 1
    int number_parts = sizes[i] == 0 ? 1 : sizes[i];
    part_offset += number_parts;
  }
  return parts[part_offset + part_index] - parts[part_offset];
}

// size_t PolygonCollection::get_point_pos(size_t polygon_index, size_t point_index) const {
//   int num_parts = sizes[polygon_index];
//   int part_offset = 0;
//   for (int i = 0; i < polygon_index; ++i) {
//     // an empty polygon (num_parts==0) should offset 1
//     int offset_part = sizes[i] == 0 ? 1 : sizes[i];
//     part_offset += offset_part;
//   }
//   int start = parts[part_offset];
//   int k = point_index + start;
//   return k;
// }

size_t PolygonCollection::get_num_parts(size_t polygon_index) const { return sizes[polygon_index]; }

size_t PolygonCollection::get_num_points(size_t polygon_index) const {
  int num_parts = sizes[polygon_index];
  int part_offset = 0;
  for (int i = 0; i < polygon_index; ++i) {
    // an empty polygon (num_parts==0) should offset 1
    int offset_part = sizes[i] == 0 ? 1 : sizes[i];
    part_offset += offset_part;
  }
  int start = parts[part_offset];
  int end = part_offset + num_parts >= parts.size() ? x.size() : parts[part_offset + num_parts];
  return end - start;
}

std::vector<std::vector<double>> PolygonCollection::get_centroids() const {
  std::vector<std::vector<double>> centroids(polygons.size());
  for (size_t i = 0; i < polygons.size(); ++i) {
    point_type pt;
    if (polygons[i].size() > 0) {
      bg::centroid(polygons[i], pt);
    }
    centroids[i].push_back(bg::get<0>(pt));
    centroids[i].push_back(bg::get<1>(pt));
  }
  return centroids;
}

Polygon PolygonCollection::buffer(size_t i, double buffer_distance, int points_per_circle) const {
  multipolygon_type result;
  const multipolygon_type& multi_poly = get_polygon(i);

  typedef double coordinate_type;
  boost::geometry::strategy::buffer::distance_symmetric<coordinate_type> distance_strategy(buffer_distance);
  boost::geometry::strategy::buffer::join_round join_strategy(points_per_circle);
  boost::geometry::strategy::buffer::end_round end_strategy(points_per_circle);
  boost::geometry::strategy::buffer::point_circle circle_strategy(points_per_circle);
  boost::geometry::strategy::buffer::side_straight side_strategy;

  boost::geometry::buffer(multi_poly, result, distance_strategy, side_strategy, join_strategy, end_strategy,
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
