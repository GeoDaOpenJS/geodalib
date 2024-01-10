

#include <boost/geometry/geometries/box.hpp>
#include <boost/geometry/index/rtree.hpp>

#include "operations/operations.h"

namespace bg = boost::geometry;
typedef std::pair<point_type, unsigned> point_val;
typedef std::pair<box_type, unsigned> box_val;

namespace bgi = boost::geometry::index;
typedef bgi::rtree<point_val, bgi::quadratic<32>> rtree_point_t;

namespace rtree = bgi::detail::rtree;

using namespace geoda;

std::vector<unsigned int> geoda::spatial_count(const PolygonCollection& polyCollection,
                                                const PointCollection& pointCollection) {
  std::vector<unsigned int> counts;
  if (!polyCollection.empty() && !pointCollection.empty()) {
    // using selected layer (points) to create rtree
    std::vector<point_val> pts;
    size_t num_points = pointCollection.size();
    for (size_t i = 0; i < num_points; ++i) {
      const multipoint_type& pc = pointCollection.points[i];
      for (auto pt : pc) {
        pts.emplace_back(std::make_pair(pt, i));
      }
    }
    rtree_point_t rtree_bbox(pts);

    // query points in polygons
    size_t num_polys = polyCollection.size();
    counts.resize(num_polys, 0);
    std::vector<point_val> q;

    for (size_t i = 0; i < num_polys; ++i) {
      const multipolygon_type& multi_poly = polyCollection.polygons[i];

      // query points in the bbox of this polygon
      box_type b;
      polyCollection.get_bbox(i, b);

      q.clear();
      rtree_bbox.query(bgi::intersects(b), std::back_inserter(q));

      for (auto& v : q) {
        if (bg::intersects(v.first, multi_poly)) {
          counts[i] += 1;
        }
      }
    }
  }
  return counts;
}
