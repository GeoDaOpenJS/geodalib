

#include <boost/geometry/geometries/box.hpp>
#include <boost/geometry/index/rtree.hpp>

#include "operations/operations.h"

namespace bg = boost::geometry;
typedef bg::model::box<point_type> box_type;
typedef std::pair<point_type, unsigned> point_val;
typedef std::pair<box_type, unsigned> box_val;

namespace bgi = boost::geometry::index;
typedef bgi::rtree<box_val, bgi::quadratic<32>> rtree_box_t;

namespace rtree = bgi::detail::rtree;

using namespace geoda;

std::vector<std::vector<unsigned int>> geoda::spatial_join(const GeometryCollection& input_geoms,
                                                            const GeometryCollection& join_geoms,
                                                            SpatialJoinType join_operation) {
  std::vector<std::vector<unsigned int>> result;
  if (!input_geoms.empty() && !join_geoms.empty()) {
    size_t input_num_geoms = input_geoms.size();
    size_t join_num_geoms = join_geoms.size();

    // create rtree using map with more geometries
    bool index_left = input_num_geoms > join_num_geoms;
    std::vector<box_val> boxes;
    for (size_t i = 0; i < (index_left ? input_num_geoms : join_num_geoms); ++i) {
      box_type b;
      if (index_left)
        input_geoms.get_bbox(i, b);
      else
        join_geoms.get_bbox(i, b);
      boxes.emplace_back(b, i);
    }
    rtree_box_t rtree_bbox(boxes);

    // query using the non-indexed geometries
    result.resize(input_num_geoms);

    std::vector<box_val> query;
    for (size_t i = 0; i < (index_left ? join_num_geoms : input_num_geoms); ++i) {
      box_type b;
      if (index_left)
        join_geoms.get_bbox(i, b);
      else
        input_geoms.get_bbox(i, b);

      query.clear();
      // just use intersects to query which is close to the query
      rtree_bbox.query(bgi::intersects(b), std::back_inserter(query));

      for (auto& v : query) {
        size_t k = v.second;

        if (input_geoms.join_test(index_left ? k : i, join_geoms, index_left ? i : k, join_operation)) {
          if (index_left) {
            result[k].push_back(i);
          } else {
            result[i].push_back(k);
          }
        }
      }
    }
  }
  return result;
}
