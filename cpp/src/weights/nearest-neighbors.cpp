

#include "weights/nearest-neighbors.h"

#include <utility>
#include <vector>

#include "features/geometry.h"

namespace bg = boost::geometry;
typedef std::pair<point_type, unsigned> point_val;

namespace bgi = boost::geometry::index;
typedef bgi::rtree<point_val, bgi::quadratic<32>> rtree_point_t;

using namespace geoda;

std::vector<std::vector<unsigned int>> geoda::knearest_neighbors(const GeometryCollection& geoms, unsigned int k) {
  // create rtree
  std::vector<point_val> pts;
  size_t num_geoms = geoms.size();
  for (size_t i = 0; i < num_geoms; ++i) {
    point_type pt;
    geoms.get_centroid(i, pt);
    pts.emplace_back(pt, i);
  }
  rtree_point_t rtree(pts);

  std::vector<std::vector<unsigned int>> result(num_geoms);

  // visit all element in rtree
  for (rtree_point_t::const_query_iterator it = rtree.qbegin(bgi::intersects(rtree.bounds())); it != rtree.qend();
       ++it) {
    const point_val& v = *it;
    size_t orig_idx = v.second;

    // each point "v" with index "obs"
    std::vector<point_val> q;
    rtree.query(bgi::nearest(v.first, k + 1), std::back_inserter(q));

    for (auto& nbr : q) {
      if (nbr.second == v.second) {
        continue;
      }
      // double d = bg::distance(v.first, w.first);
      result[orig_idx].push_back(nbr.second);
    }
  }

  return result;
}
