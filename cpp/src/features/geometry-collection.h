#ifndef GEODA_GEOMETRY_COLLECTION_H
#define GEODA_GEOMETRY_COLLECTION_H
#include <boost/geometry.hpp>
#include <limits>
#include <string>
#include <vector>

#include "features/geometry.h"

namespace bg = boost::geometry;
typedef bg::model::d2::point_xy<double> point_type;
typedef bg::model::multi_point<point_type> multipoint_type;
typedef bg::model::linestring<point_type> line_type;
typedef bg::model::multi_linestring<line_type> multiline_type;
typedef bg::model::polygon<point_type> polygon_type;
typedef bg::model::multi_polygon<polygon_type> multipolygon_type;
typedef bg::model::box<point_type> box_type;

namespace geoda {

enum SpatialJoinType { INTERSECTS = 0, WITHIN = 1, TOUCHES = 2, OVERLAPS = 3, CROSSES = 4, EQUALS = 5 };

const int TRUE = 1;
const int FALSE = 0;

/**
 * Absract class GeometryCollection:
 *
 * Used to transfer a bulk of geometries from e.g. javascript to Wasm module
 */
class GeometryCollection {
 public:
  std::vector<double> x;
  std::vector<double> y;
  std::vector<unsigned int> parts;
  std::vector<unsigned int> sizes;

  bool convert_to_UTM;
  std::vector<std::string> utm_zones;

  GeometryCollection(const std::vector<double>& x, const std::vector<double>& y, const std::vector<unsigned int>& parts,
                     const std::vector<unsigned int>& sizes, bool convert_to_UTM);
  virtual ~GeometryCollection() = default;

  void ConvertToUTM(int index, double lat, double lng, double& north, double& east);

  size_t size() const { return sizes.size(); }
  bool empty() const { return sizes.empty(); }

  virtual multipoint_type get_point(size_t i) const { throw; }
  virtual multiline_type get_line(size_t i) const { throw; }
  virtual multipolygon_type get_polygon(size_t i) const { throw; }

  virtual void get_bbox(size_t i, box_type& box) const = 0;

  virtual ShapeType get_type() const = 0;
  virtual int get_centroid(size_t i, point_type& pt) const = 0;

  virtual bool join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                         SpatialJoinType join_operation) const = 0;

  virtual Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const = 0;
};

/**
 * PolygonCollection
 */
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

  int get_centroid(size_t i, point_type& pt) const override;

  multipolygon_type get_polygon(size_t i) const override { return polygons[i]; };

  bool join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                 SpatialJoinType join_operation) const override;

  Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const override;
};

/**
 * LineCollection
 */
class LineCollection : public GeometryCollection {
 public:
  std::vector<multiline_type> lines;

  LineCollection(const std::vector<double>& x, const std::vector<double>& y, const std::vector<unsigned int>& parts,
                 const std::vector<unsigned int>& sizes, bool convert_to_UTM = false);

  ~LineCollection() override = default;

  void get_bbox(size_t i, box_type& box) const override { bg::envelope(lines[i], box); }

  ShapeType get_type() const override { return ShapeType::LINE; }

  int get_centroid(size_t i, point_type& pt) const override;

  multiline_type get_line(size_t i) const override { return lines[i]; };

  bool join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                 SpatialJoinType join_operation) const override;

  Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const override;
};

/**
 * PointCollection
 */
class PointCollection : public GeometryCollection {
 public:
  std::vector<multipoint_type> points;

  PointCollection(const std::vector<double>& x, const std::vector<double>& y, const std::vector<unsigned int>& parts,
                  const std::vector<unsigned int>& sizes, bool convert_to_UTM = false);

  ~PointCollection() override = default;

  void get_bbox(size_t i, box_type& box) const override { bg::envelope(points[i], box); }

  ShapeType get_type() const override { return ShapeType::POINT; }

  int get_centroid(size_t i, point_type& pt) const override;

  multipoint_type get_point(size_t i) const override { return points[i]; };

  bool join_test(size_t i, const GeometryCollection& join_geoms, size_t j,
                 SpatialJoinType join_operation) const override;

  Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const override;
};

}  // namespace geoda

#endif  // GEODA_GEOMETRY_COLLECTION_H
