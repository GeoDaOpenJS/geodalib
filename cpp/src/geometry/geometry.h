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

class Polygon;  // forward declaration

class Geometry {
 public:
  virtual ~Geometry() = default;
  virtual std::vector<double> get_x() const = 0;
  virtual std::vector<double> get_y() const = 0;
  virtual ShapeType get_type() const = 0;
};

// forward declarations
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

  virtual bool intersect(size_t i, const GeometryCollection& join_geoms, size_t j) const = 0;
  virtual void get_bbox(size_t i, box_type& box) const = 0;

  virtual ShapeType get_type() const = 0;
  virtual std::vector<std::vector<double>> get_centroids() const = 0;
  virtual point_type get_centroid(size_t i) const = 0;
  virtual Polygon buffer(size_t i, double buffer_distance, int points_per_circle) const = 0;

  virtual double get_area(size_t i) const = 0;
  virtual double get_length(size_t i) const = 0;
  virtual double get_perimeter(size_t i) const = 0;

  virtual int get_part(size_t geom_index, size_t part_index) const { throw; }
  virtual point_type get_point(size_t geom_index, size_t point_index) const { throw; }
  virtual size_t get_num_parts(size_t geom_index) const { throw; }
  virtual size_t get_num_points(size_t geom_index) const { throw; }
};

}  // namespace geoda

#endif  // GEODA_GEOMETRY_COLLECTION_H
