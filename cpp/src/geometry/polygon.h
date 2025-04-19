#ifndef GEODA_POLYGON_H
#define GEODA_POLYGON_H

#include <vector>

#include "geometry/geometry.h"

namespace geoda {

class Polygon : public Geometry {
 public:
  std::vector<double> x;
  std::vector<double> y;
  std::vector<unsigned int> parts;
  std::vector<unsigned int> holes;

  Polygon() = default;
  ~Polygon() override = default;

  std::vector<double> get_x() const override { return x; }
  std::vector<double> get_y() const override { return y; }
  std::vector<unsigned int> get_holes() const { return holes; }
  std::vector<unsigned int> get_parts() const { return parts; }
  unsigned int size() const { return parts.size(); }
  ShapeType get_type() const override { return ShapeType::POLYGON; }

  void add(const std::vector<double>& in_x, const std::vector<double>& in_y, bool is_hole);
};

class PolygonCollection : public GeometryCollection {
 public:
  std::vector<unsigned int> holes;
  std::vector<multipolygon_type> polygons;

  PolygonCollection(const std::vector<double>& x, const std::vector<double>& y, const std::vector<unsigned int>& parts,
                    const std::vector<unsigned int>& holes, const std::vector<unsigned int>& sizes,
                    bool fix_polygon = false, bool convert_to_UTM = false);

  ~PolygonCollection() override = default;

  void get_bbox(size_t i, box_type& box) const override { bg::envelope(polygons[i], box); }

  ShapeType get_type() const override { return ShapeType::POLYGON; }

  std::vector<std::vector<double>> get_centroids() const override;

  point_type get_centroid(size_t i) const override {
    point_type pt;
    bg::centroid(polygons[i], pt);
    return pt;
  }

  Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const override;

  double get_area(size_t i) const override { return bg::area(polygons[i]); }
  double get_length(size_t i) const override { return 0; }
  double get_perimeter(size_t i) const override { return bg::perimeter(polygons[i]); }

  multipolygon_type get_polygon(size_t i) const override { return polygons[i]; }

  void get_polygon(size_t polygon_index, Polygon& poly);

  int get_part(size_t geom_index, size_t part_index) const override;

  point_type get_point(size_t geom_index, size_t point_index) const override;

  size_t get_num_parts(size_t geom_index) const override;

  size_t get_num_points(size_t geom_index) const override;

  bool intersect(size_t i, const GeometryCollection& join_geoms, size_t j) const override {
    const auto& left_geom = get_polygon(i);
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
