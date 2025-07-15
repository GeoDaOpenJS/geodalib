// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#ifndef GEODA_POINT_H
#define GEODA_POINT_H

#include <vector>

#include "geometry/geometry.h"
namespace geoda {

class Polygon;  // forward declaration
class Point : public Geometry {
 public:
  std::vector<double> x;
  std::vector<double> y;

  Point() = default;
  ~Point() override = default;

  std::vector<double> get_x() const override { return x; }
  std::vector<double> get_y() const override { return y; }
  unsigned int size() const { return x.size(); }
  ShapeType get_type() const override { return ShapeType::POINT; }

  void add(double in_x, double in_y);
};

/**
 * @brief PointCollection class for Point or MultiPoint shape type
 *
 */
class PointCollection : public GeometryCollection {
 public:
  std::vector<multipoint_type> points;

  /**
   * @brief Construct a new Point Collection object
   *
   * @param x The x coordinates
   * @param y  The y coordinates
   * @param parts The array of part index for each point geometry
   * @param sizes  The array of size (how many parts) of each point geometry
   * @param convert_to_UTM If true, convert the coordinates to UTM in the unit of meters
   */
  PointCollection(const std::vector<double>& x, const std::vector<double>& y, const std::vector<unsigned int>& parts,
                  const std::vector<unsigned int>& sizes, bool convert_to_UTM = false);

  ~PointCollection() override = default;

  void get_bbox(size_t i, box_type& box) const override { bg::envelope(points[i], box); }

  ShapeType get_type() const override { return ShapeType::POINT; }

  std::vector<std::vector<double>> get_centroids() const override;

  point_type get_centroid(size_t i) const override {
    point_type pt;
    bg::centroid(points[i], pt);
    return pt;
  }

  Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const override;

  double get_area(size_t i) const override { return 0; }
  double get_length(size_t i) const override { return 0; }
  double get_perimeter(size_t i) const override { return 0; }

  multipoint_type get_point(size_t i) const override { return points[i]; }

  bool intersect(size_t i, const GeometryCollection& join_geoms, size_t j) const override {
    const auto& left_geom = get_point(i);
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
