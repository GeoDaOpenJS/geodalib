// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include "geometry/mst.h"

using namespace geoda;

MST::MST(const std::vector<double>& x, const std::vector<double>& y, std::vector<double>& weights) : x_(x), y_(y) {
  // create distance matrix from points (only upper triangle needed due to symmetry)
  size_t num_obs = x_.size();
  distance_matrix_.resize(num_obs);
  for (size_t i = 0; i < num_obs; i++) {
    distance_matrix_[i].resize(num_obs - i - 1);
    for (size_t j = i + 1, k = 0; j < num_obs; j++, k++) {
      double x1 = x_[i];
      double y1 = y_[i];
      double x2 = x_[j];
      double y2 = y_[j];
      double dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
      distance_matrix_[i][k] = std::sqrt(dist);
    }
  }

  BGraph g(num_obs);
  for (int i = 0; i < num_obs; i++) {
    for (int j = i + 1, k = 0; j < num_obs; j++, k++) {
      boost::add_edge(i, j, distance_matrix_[i][k], g);
    }
  }

  // https://github.com/vinecopulib/vinecopulib/issues/22
  std::vector<int> p(num_vertices(g));
  prim_minimum_spanning_tree(g, p.data());

  for (int source = 0; source < p.size(); ++source) {
    int target = p[source];
    if (source != target) {
      // boost::add_edge(source, p[source], mst);
      mst_edges.push_back(std::make_pair(source, target));
    }
  }

  // create GeoJSON lines from mst_edges
  size_t num_edges = 0;

  for (int i = 0; i < mst_edges.size(); i++) {
    int f_idx = mst_edges[i].first;
    int t_idx = mst_edges[i].second;
    if (f_idx == t_idx) {
      continue;
    }
    num_edges++;
  }

  this->lines_.resize(num_edges);

  for (int i = 0; i < mst_edges.size(); i++) {
    const std::pair<int, int>& s_t = mst_edges[i];
    int f_idx = s_t.first;
    int t_idx = s_t.second;
    if (f_idx == t_idx) {
      continue;
    }

    double cost =
        t_idx > f_idx ? distance_matrix_[f_idx][t_idx - f_idx - 1] : distance_matrix_[t_idx][f_idx - t_idx - 1];

    std::vector<double> x_coords;
    std::vector<double> y_coords;
    x_coords.push_back(x_[f_idx]);
    y_coords.push_back(y_[f_idx]);
    x_coords.push_back(x_[t_idx]);
    y_coords.push_back(y_[t_idx]);

    this->lines_[i].add(x_coords, y_coords);
    weights.push_back(cost);
  }
}

MST::~MST() {}

std::vector<Line> MST::get_lines() const { return lines_; }
