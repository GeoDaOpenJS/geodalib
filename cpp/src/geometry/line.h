// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#ifndef GEODA_LINE_H
#define GEODA_LINE_H

#include <vector>

#include "geometry/geometry.h"

namespace geoda {

class Polygon;

class Line : public Geometry {
 public:
  std::vector<double> x;
  std::vector<double> y;
  std::vector<unsigned int> parts;

  Line() = default;
  ~Line() override = default;

  std::vector<double> get_x() const override { return x; }
  std::vector<double> get_y() const override { return y; }
  std::vector<unsigned int> get_parts() const { return parts; }
  unsigned int size() const { return parts.size(); }
  ShapeType get_type() const override { return ShapeType::LINE; }

  void add(const std::vector<double>& in_x, const std::vector<double>& in_y);
};

class LineCollection : public GeometryCollection {
 public:
  std::vector<multiline_type> lines;

  LineCollection(const std::vector<double>& x, const std::vector<double>& y, const std::vector<unsigned int>& parts,
                 const std::vector<unsigned int>& sizes, bool convert_to_UTM = false);

  ~LineCollection() override = default;

  void get_bbox(size_t i, box_type& box) const override { bg::envelope(lines[i], box); }

  ShapeType get_type() const override { return ShapeType::LINE; }

  std::vector<std::vector<double>> get_centroids() const override;

  point_type get_centroid(size_t i) const override {
    point_type pt;
    bg::centroid(lines[i], pt);
    return pt;
  }

  Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const override;

  double get_area(size_t i) const override { return 0; }
  double get_length(size_t i) const override { return bg::length(lines[i]); }
  double get_perimeter(size_t i) const override { return bg::perimeter(lines[i]); }

  multiline_type get_line(size_t i) const override { return lines[i]; }

  bool intersect(size_t i, const GeometryCollection& join_geoms, size_t j) const override {
    const auto& left_geom = get_line(i);
    if (join_geoms.get_type() == ShapeType::POINT) {
      const auto& right_geom = join_geoms.get_point(j);
      return bg::intersects(left_geom, right_geom);
    } else if (join_geoms.get_type() == ShapeType::LINE) {
      const auto& right_geom = join_geoms.get_line(j);
      return bg::intersects(left_geom, right_geom);
    } else if (join_geoms.get_type() == ShapeType::POLYGON) {
      const auto& right_geom = join_geoms.get_polygon(j);
      return bg::intersects(left_geom, right_geom);
    }
    return false;
  }
};

}  // namespace geoda
#endif
