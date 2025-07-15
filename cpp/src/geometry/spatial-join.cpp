// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include <utility>

#include <boost/geometry/geometries/box.hpp>
#include <boost/geometry/index/rtree.hpp>

#include "geometry/geometry.h"
#include "geometry/spatial-join.h"

typedef boost::geometry::model::box<point_type> boost_box;
typedef std::pair<boost_box, unsigned int> box_value;
typedef boost::geometry::index::rtree<box_value, boost::geometry::index::quadratic<32>> boost_rtree;

// function to create a rtree from geometry collection
boost_rtree create_rtree(const geoda::GeometryCollection& collection) {
  std::vector<box_value> boxes;
  for (size_t i = 0; i < collection.size(); ++i) {
    boost_box box;
    collection.get_bbox(i, box);
    boxes.emplace_back(box, i);
  }
  boost_rtree rtree(boxes);
  return rtree;
}

std::vector<std::vector<unsigned int>> geoda::spatial_join(const geoda::GeometryCollection& left,
                                                           const geoda::GeometryCollection& right) {
  std::vector<std::vector<unsigned int>> result;

  if (left.empty() || right.empty()) {
    return result;
  }

  result.resize(left.size());

  // build a rtree using the bbox of either left or right
  bool left_index = left.size() > right.size();
  boost_rtree rtree = left_index ? create_rtree(left) : create_rtree(right);

  // try less number of queries
  int query_size = left_index ? right.size() : left.size();

  // query
  std::vector<box_value> query_result;
  for (size_t i = 0; i < query_size; ++i) {
    // get the bbox of the query geometry
    boost_box query_box;
    if (left_index) {
      right.get_bbox(i, query_box);
    } else {
      left.get_bbox(i, query_box);
    }
    // query the potential intersecting geometries from the rtree
    rtree.query(boost::geometry::index::intersects(query_box), std::back_inserter(query_result));

    // test the intersection of the query geometry with the potential intersecting geometries
    for (const auto& item : query_result) {
      // get the index of the potential intersecting geometry
      size_t idx = item.second;
      // run intersection test
      if (left_index) {
        if (left.intersect(idx, right, i)) {
          result[idx].push_back(i);
        }
      } else {
        if (left.intersect(i, right, idx)) {
          result[i].push_back(idx);
        }
      }
    }
    query_result.clear();
  }

  return result;
}
