// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#ifndef GEODA_MST_H
#define GEODA_MST_H

#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/prim_minimum_spanning_tree.hpp>
#include <boost/heap/priority_queue.hpp>
#include <utility>
#include <vector>

#include "geometry/line.h"

namespace geoda {

typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::undirectedS,
                              boost::no_property,                            // VertexProperties
                              boost::property<boost::edge_weight_t, double>  // EdgeProperties
                              >
    BGraph;

class MST {
 public:
  MST(const std::vector<double>& x, const std::vector<double>& y, std::vector<double>& weights);
  ~MST();

  std::vector<Line> get_lines() const;

 private:
  std::vector<double> x_;
  std::vector<double> y_;
  std::vector<Line> lines_;

  // distance matrix
  std::vector<std::vector<double>> distance_matrix_;

  std::vector<std::pair<int, int>> mst_edges;
};

inline std::vector<Line> mst(const std::vector<double>& x, const std::vector<double>& y, std::vector<double>& weights) {
  if (x.size() == 0 || x.size() != y.size()) {
    // return empty vector
    return std::vector<Line>();
  }
  MST mst(x, y, weights);
  return mst.get_lines();
}

}  // namespace geoda

#endif
