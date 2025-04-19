#include "geometry/spatial-dissolve.h"

#include <algorithm>
#include <boost/geometry.hpp>
#include <boost/geometry/geometries/box.hpp>
#include <boost/geometry/geometries/multi_polygon.hpp>
#include <boost/geometry/geometries/point.hpp>
#include <boost/geometry/index/detail/utilities.hpp>
#include <boost/geometry/index/rtree.hpp>
#include <map>
#include <utility>
#include <vector>

#include "geometry/polygon.h"

namespace bg = boost::geometry;
typedef bg::model::d2::point_xy<double> point_type;
typedef bg::model::polygon<point_type> polygon_type;
typedef bg::model::multi_polygon<polygon_type> multi_polygon_type;

typedef bg::model::box<point_type> box_type;
typedef std::pair<point_type, unsigned> point_val;
typedef std::pair<box_type, unsigned> box_val;

namespace bgi = boost::geometry::index;
typedef bgi::rtree<box_val, bgi::quadratic<32>> rtree_box_t;

namespace rtree = bgi::detail::rtree;

using namespace geoda;

/**
 * Visit internal BOOST r-tree structure, and merge the polygons from bottom-up
 *
 */
template <typename Value, typename Options, typename Box, typename Allocators>
struct UnionQuery : public rtree::visitor<Value, typename Options::parameters_type, Box, Allocators,
                                          typename Options::node_tag, true>::type {
  typedef typename rtree::internal_node<Value, typename Options::parameters_type, Box, Allocators,
                                        typename Options::node_tag>::type internal_node;
  typedef
      typename rtree::leaf<Value, typename Options::parameters_type, Box, Allocators, typename Options::node_tag>::type
          leaf;

  inline explicit UnionQuery(const PolygonCollection& polygons) : polys(polygons) {}  // NOLINT

  // when visit internal node, DFS
  inline void operator()(internal_node const& n) {
    typedef typename rtree::elements_type<internal_node>::type elements_type;
    elements_type const& elements = rtree::elements(n);
    for (typename elements_type::const_iterator it = elements.begin(); it != elements.end(); ++it) {
      rtree::apply_visitor(*this, *it->second);
    }
  }

  // when visit leaf node
  inline void operator()(leaf const& n) {
    typedef typename rtree::elements_type<leaf>::type elements_type;
    elements_type const& elements = rtree::elements(n);

    // merge all leaf nodes with same parent
    multi_polygon_type union_poly;  // the union polygons
    multi_polygon_type tmp_poly;    // a temporary variable
    for (auto& item : rtree::elements(n)) {
      int tmp_id = item.second;
      const multipolygon_type& poly = polys.polygons[tmp_id];
      bool valid = boost::geometry::is_valid(poly);
      if (valid) {
        boost::geometry::union_(union_poly, poly, tmp_poly);
        union_poly = tmp_poly;
        boost::geometry::clear(tmp_poly);
      } else {
        invalid_polys.push_back(poly);
      }
    }
    groups.push_back(union_poly);
  }

  std::vector<multi_polygon_type> groups;

  std::vector<multi_polygon_type> invalid_polys;

  const PolygonCollection& polys;
};

/**
 * Continue mergeing polygons (divide and conquer) using the ordered polygons by their locations
 */
multi_polygon_type merge_polyons(const std::vector<multi_polygon_type>& groups, int begin, int end) {  // NOLINT
  if (begin >= end) {
    return groups[begin];
  }

  auto mid = begin + (end - begin) / 2;
  multi_polygon_type left_poly = merge_polyons(groups, begin, mid);
  multi_polygon_type right_poly = merge_polyons(groups, mid + 1, end);

  // merge left_poly and right_poly
  multi_polygon_type union_poly;
  boost::geometry::union_(left_poly, right_poly, union_poly);
  return union_poly;
}

// Merge multiple polygons to one polygon by dissolving the shared borders,
// return one polygon.
// Note: any invalid input polygons or islands should be attached in a multiple-polygon
Polygon geoda::spatial_dissolve(const PolygonCollection& polys) {
  //   // dynamic cast to PolygonCollection if possible, otherwise throw error
  //   const PolygonCollection* polys = dynamic_cast<const PolygonCollection*>(&geoms);
  //   if (!polys) {
  //     // return empty polygon
  //     return Polygon();
  //   }

  Polygon result;
  int num_polys = polys.size();

  if (num_polys > 0) {
    // create rtree using bbox
    std::map<int, bool> processed;
    std::vector<box_val> boxes;
    for (int i = 0; i < num_polys; ++i) {
      box_type b;
      polys.get_bbox(i, b);
      boxes.emplace_back(b, i);
    }
    rtree_box_t rtree_bbox(boxes);

    using V = rtree::utilities::view<rtree_box_t>;
    V rtv(rtree_bbox);
    UnionQuery<typename V::value_type, typename V::options_type, typename V::box_type, typename V::allocators_type> vis(
        polys);

    rtv.apply_visitor(vis);

    // divide and conquer
    multi_polygon_type border = merge_polyons(vis.groups, 0, vis.groups.size() - 1);

    // build result
    for (auto& poly : border) {
      std::vector<double> xs, ys;
      // only need exterior/outer ring
      for (auto it = boost::begin(boost::geometry::exterior_ring(poly));
           it != boost::end(boost::geometry::exterior_ring(poly)); ++it) {
        double x = bg::get<0>(*it);
        double y = bg::get<1>(*it);
        xs.push_back(x);
        ys.push_back(y);
      }
      result.add(xs, ys, false);
    }
    for (auto& invalid_poly : vis.invalid_polys) {
      for (auto& poly : invalid_poly) {
        std::vector<double> xs, ys;
        for (auto it = boost::begin(boost::geometry::exterior_ring(poly));
             it != boost::end(boost::geometry::exterior_ring(poly)); ++it) {
          double x = bg::get<0>(*it);
          double y = bg::get<1>(*it);
          xs.push_back(x);
          ys.push_back(y);
        }
        result.add(xs, ys, false);
      }
    }
  }

  return result;
}
