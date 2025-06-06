#ifndef GEODA_THIESSEN_POLYGON_H
#define GEODA_THIESSEN_POLYGON_H

#include <boost/geometry.hpp>
#include <boost/geometry/geometries/point_xy.hpp>
#include <boost/geometry/geometries/polygon.hpp>
#include <boost/geometry/multi/geometries/multi_point.hpp>
#include <boost/polygon/voronoi.hpp>
#include <boost/polygon/voronoi_builder.hpp>
#include <boost/polygon/voronoi_diagram.hpp>
#include <list>
#include <map>
#include <utility>
#include <vector>

#include "geometry/geometry.h"
#include "geometry/polygon.h"
#include "utils/jc_voronoi.h"

namespace geoda {

typedef boost::polygon::voronoi_builder<int> VB;
typedef boost::polygon::voronoi_diagram<double> VD;
typedef std::pair<int, int> int_pair;

typedef boost::geometry::model::d2::point_xy<double> point_xy;
typedef boost::geometry::model::multi_point<point_xy> mpoint_type;
typedef boost::geometry::model::polygon<point_xy> my_polygon;
typedef boost::geometry::ring_type<my_polygon>::type ring_type;

class ThiessenPoint {
 public:
  double x;
  double y;
  ThiessenPoint(double x, double y) : x(x), y(y) {}
  ThiessenPoint() : x(0), y(0) {}
  ~ThiessenPoint() = default;
  double get_x() const { return x; }
  double get_y() const { return y; }
};

class ThiessenPolygon {
 public:
  ThiessenPolygon(const std::vector<double>& x, const std::vector<double>& y);
  std::vector<Polygon> get_polygons() const;

 private:
  std::vector<Polygon> polys;

  // Cohen-Sutherland clipping algorithm constants
  static const int INSIDE = 0;  // 0000
  static const int LEFT = 1;    // 0001
  static const int RIGHT = 2;   // 0010
  static const int BOTTOM = 4;  // 0100
  static const int TOP = 8;     // 1000

  std::list<int>* getCellList(const VD::cell_type& cell, std::map<int_pair, std::list<int>*>& pt_to_id_list,
                              std::vector<int_pair>& int_pts);

  bool isVertexOutsideBB(const VD::vertex_type& vertex, const double& xmin, const double& ymin, const double& xmax,
                         const double& ymax);

  /** Clip both infinite and finite edges to bounding rectangle.
   * return true if intersection or if edge is contained within bounding box,
   * otherwise return false
   */
  bool clipEdge(const VD::edge_type& edge, std::vector<std::pair<int, int>>& int_pts, const double& xmin,
                const double& ymin, const double& xmax, const double& ymax, double& x0, double& y0, double& x1,
                double& y1);

  /** Clip infinite edge to bounding rectangle */
  bool clipInfiniteEdge(const VD::edge_type& edge, std::vector<std::pair<int, int>>& int_pts, const double& xmin,
                        const double& ymin, const double& xmax, const double& ymax, double& x0, double& y0, double& x1,
                        double& y1);

  bool clipFiniteEdge(const VD::edge_type& edge, std::vector<std::pair<int, int>>& int_pts, const double& xmin,
                      const double& ymin, const double& xmax, const double& ymax, double& x0, double& y0, double& x1,
                      double& y1);

  bool clipToBB(double& x0, double& y0, double& x1, double& y1, const double& xmin, const double& ymin,
                const double& xmax, const double& ymax);

  int computeOutCode(const double& x, const double& y, const double& xmin, const double& ymin, const double& xmax,
                     const double& ymax);

  void createPolygonFromPoints(int edge_cnt, ThiessenPoint* pts, Polygon& poly);
};

inline std::vector<Polygon> thiessen_polygon(const std::vector<double>& x, const std::vector<double>& y) {
  if (x.size() == 0 || x.size() != y.size()) {
    // return empty vector
    return std::vector<Polygon>();
  }
  ThiessenPolygon thiessen_polygon(x, y);
  return thiessen_polygon.get_polygons();
}

}  // namespace geoda

#endif  // GEODA_THIESSEN_POLYGON_H
