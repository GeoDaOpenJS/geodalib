#ifndef GEODA_GEOMETRY_COLLECTION_H
#define GEODA_GEOMETRY_COLLECTION_H
#include <boost/geometry.hpp>
#include <limits>
#include <string>
#include <vector>

namespace bg = boost::geometry;
typedef bg::model::d2::point_xy<double> point_type;
typedef bg::model::multi_point<point_type> multipoint_type;
typedef bg::model::linestring<point_type> line_type;
typedef bg::model::multi_linestring<line_type> multiline_type;
typedef bg::model::polygon<point_type> polygon_type;
typedef bg::model::multi_polygon<polygon_type> multipolygon_type;
typedef bg::model::box<point_type> box_type;

namespace geoda {

enum ShapeType { POINT = 1, LINE = 2, POLYGON = 3 };

const int TRUE = 1;
const int FALSE = 0;

class Geometry {
 public:
  virtual ~Geometry() = default;
  virtual std::vector<double> get_x() const = 0;
  virtual std::vector<double> get_y() const = 0;
  virtual ShapeType get_type() const = 0;
};

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
  virtual std::vector<std::vector<double>> get_centroids() const = 0;
  virtual point_type get_centroid(size_t i) const = 0;
};

class PointCollection : public GeometryCollection {
 public:
  std::vector<multipoint_type> points;

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

  multipoint_type get_point(size_t i) const override {
    return points[i];
  };
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

  multiline_type get_line(size_t i) const override {
    return lines[i];
  };
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

  multipolygon_type get_polygon(size_t i) const override {
    return polygons[i];
  };
};

}  // namespace geoda

#endif  // GEODA_GEOMETRY_COLLECTION_H
