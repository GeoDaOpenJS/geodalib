#include "features/geometry-collection.h"

#include <algorithm>
#include <sstream>
#include <vector>
#include <boost/geometry/algorithms/buffer.hpp>
#include <boost/geometry/io/wkt/write.hpp>

#include "utils/UTM.h"

using namespace geoda;

// long, lat (UTM: meter)
GeometryCollection::GeometryCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                       const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                                       bool convert_to_UTM)
    : x(in_x), y(in_y), parts(parts), sizes(sizes), convert_to_UTM(convert_to_UTM) {}

void GeometryCollection::ConvertToUTM(int index, double lat, double lng, double& north, double& east) {
  if (utm_zones[index].empty()) {
    char zone[4] = {'\0'};
    UTM::LLtoUTM(lat, lng, north, east, zone);
    utm_zones[index] = zone;
  } else {
    char* zone = const_cast<char*>(utm_zones[index].c_str());
    UTM::LLtoUTM(lat, lng, north, east, zone);
  }
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
    // extract and create multipolygon_type
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

int PolygonCollection::get_centroid(size_t i, point_type& pt) const {
  if (polygons[i].size() > 0) {
    bg::centroid(polygons[i], pt);
    return TRUE;
  }
  return FALSE;
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

bool PolygonCollection::join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                                  SpatialJoinType join_operation) const {
  // polygon vs point/line/polygon
  const multipolygon_type& multi_poly = get_polygon(i);

  if (join_geoms.get_type() == ShapeType::POINT) {
    const multipoint_type& pt = join_geoms.get_point(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_poly, pt);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return false;
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_poly, pt);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_poly, pt);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_poly, pt);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return false;
    }
  } else if (join_geoms.get_type() == ShapeType::LINE) {
    const multiline_type& multi_line = join_geoms.get_line(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_poly, multi_line);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return false;
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_poly, multi_line);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_poly, multi_line);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_poly, multi_line);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return false;
    }
  } else if (join_geoms.get_type() == ShapeType::POLYGON) {
    const multipolygon_type& multi_poly2 = join_geoms.get_polygon(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_poly, multi_poly2);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return boost::geometry::within(multi_poly, multi_poly2);
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_poly, multi_poly2);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_poly, multi_poly2);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_poly, multi_poly2);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return boost::geometry::equals(multi_poly, multi_poly2);
    }
  }
  return false;
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

int LineCollection::get_centroid(size_t i, point_type& pt) const {
  if (lines[i].size() > 0) {
    bg::centroid(lines[i], pt);
    return TRUE;
  }
  return FALSE;
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

bool LineCollection::join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                               SpatialJoinType join_operation) const {
  // line vs point/line/polygon
  const multiline_type& multi_line = get_line(i);

  if (join_geoms.get_type() == ShapeType::POINT) {
    const multipoint_type& pt = join_geoms.get_point(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_line, pt);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return false;
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_line, pt);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_line, pt);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_line, pt);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return false;
    }
  } else if (join_geoms.get_type() == ShapeType::LINE) {
    const multiline_type& multi_line2 = join_geoms.get_line(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_line, multi_line2);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return boost::geometry::within(multi_line, multi_line2);
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_line, multi_line2);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_line, multi_line2);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_line, multi_line2);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return boost::geometry::equals(multi_line, multi_line2);
    }
  } else if (join_geoms.get_type() == ShapeType::POLYGON) {
    const multipolygon_type& multi_poly2 = join_geoms.get_polygon(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_line, multi_poly2);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return boost::geometry::within(multi_line, multi_poly2);
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_line, multi_poly2);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_line, multi_poly2);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_line, multi_poly2);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return false;
    }
  }
  return false;
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

int PointCollection::get_centroid(size_t i, point_type& pt) const {
  if (points[i].size() > 0) {
    bg::centroid(points[i], pt);
    return TRUE;
  }
  return FALSE;
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

bool PointCollection::join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                                SpatialJoinType join_operation) const {
  // point vs point/line/polygon
  const multipoint_type& multi_point = get_point(i);

  if (join_geoms.get_type() == ShapeType::POINT) {
    const multipoint_type& pt = join_geoms.get_point(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_point, pt);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return boost::geometry::within(multi_point, pt);
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_point, pt);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_point, pt);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_point, pt);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return boost::geometry::equals(multi_point, pt);
    }
  } else if (join_geoms.get_type() == ShapeType::LINE) {
    const multiline_type& multi_line2 = join_geoms.get_line(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_point, multi_line2);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return boost::geometry::within(multi_point, multi_line2);
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_point, multi_line2);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_point, multi_line2);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_point, multi_line2);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return false;
    }
  } else if (join_geoms.get_type() == ShapeType::POLYGON) {
    const multipolygon_type& multi_poly2 = join_geoms.get_polygon(j);

    if (join_operation == SpatialJoinType::INTERSECTS) {
      return boost::geometry::intersects(multi_point, multi_poly2);
    } else if (join_operation == SpatialJoinType::WITHIN) {
      return boost::geometry::within(multi_point, multi_poly2);
    } else if (join_operation == SpatialJoinType::TOUCHES) {
      return boost::geometry::touches(multi_point, multi_poly2);
    } else if (join_operation == SpatialJoinType::OVERLAPS) {
      return boost::geometry::overlaps(multi_point, multi_poly2);
    } else if (join_operation == SpatialJoinType::CROSSES) {
      return boost::geometry::crosses(multi_point, multi_poly2);
    } else if (join_operation == SpatialJoinType::EQUALS) {
      return false;
    }
  }
  return false;
}
