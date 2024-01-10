

#ifndef GEODA_GEOMETRY_H
#define GEODA_GEOMETRY_H
#include <limits>
#include <vector>

namespace geoda {
enum ShapeType { POINT = 1, LINE = 2, POLYGON = 3 };

class Geometry {
 public:
  virtual ~Geometry() = default;
  [[nodiscard]] virtual std::vector<double> get_x() const = 0;
  [[nodiscard]] virtual std::vector<double> get_y() const = 0;
  [[nodiscard]] virtual ShapeType get_type() const = 0;
};

/**
 * Polygon data structure used to transfer data between javascript and WASM
 * Same design as SHP/WKB
 * Support Polygon and MultiPolygon
 */
class Polygon : public Geometry {
 public:
  std::vector<double> x;
  std::vector<double> y;
  std::vector<unsigned int> parts;
  std::vector<unsigned int> holes;

  Polygon() = default;
  ~Polygon() override = default;

  // Polygon(unsigned char* wkb) {}
  [[nodiscard]] std::vector<double> get_x() const override { return x; }
  [[nodiscard]] std::vector<double> get_y() const override { return y; }
  [[nodiscard]] std::vector<unsigned int> get_holes() const { return holes; }
  [[nodiscard]] std::vector<unsigned int> get_parts() const { return parts; }
  unsigned int size() const { return parts.size(); }
  ShapeType get_type() const override { return ShapeType::POLYGON; }

  void add(const std::vector<double>& in_x, const std::vector<double>& in_y, bool is_hole);
};

/**
 * Line data structure used to transfer data between javascript and WASM
 * Support LineString and MultiLineString
 */
class Line : public Geometry {
 public:
  std::vector<double> x;
  std::vector<double> y;
  std::vector<unsigned int> parts;

  Line() = default;
  // Line(unsigned char* wkb) {}
  ~Line() override = default;

  std::vector<double> get_x() const override { return x; }
  std::vector<double> get_y() const override { return y; }
  std::vector<unsigned int> get_parts() const { return parts; }
  unsigned int size() const { return parts.size(); }
  ShapeType get_type() const override { return ShapeType::LINE; }

  void add(const std::vector<double>& in_x, const std::vector<double>& in_y);
};

/**
 * Point data structure used to transfer data between javascript and WASM
 * Support Point and MultiPoints
 */
class Point : public Geometry {
 public:
  std::vector<double> x;
  std::vector<double> y;

  Point() = default;
  // Point(unsigned char* wkb) {}
  ~Point() override = default;

  std::vector<double> get_x() const override { return x; }
  std::vector<double> get_y() const override { return y; }
  unsigned int size() const { return x.size(); }
  ShapeType get_type() const override { return ShapeType::POINT; }

  void add(double in_x, double in_y);
};

}  // namespace geoda

#endif  // GEODA_GEOMETRY_H
