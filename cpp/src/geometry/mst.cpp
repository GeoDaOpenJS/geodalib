#include "geometry/mst.h"

using namespace geoda;

MST::MST(const std::vector<double>& x, const std::vector<double>& y, std::vector<double>& weights) : x_(x), y_(y) {
  // create distance matrix from points (only upper triangle needed due to symmetry)
  distance_matrix_ = std::vector<std::vector<double>>(x_.size(), std::vector<double>(x_.size()));
  for (size_t i = 0; i < x_.size(); i++) {
    for (size_t j = i + 1; j < x_.size(); j++) {
      double dist = std::sqrt(std::pow(x_[i] - x_[j], 2) + std::pow(y_[i] - y_[j], 2));
      distance_matrix_[i][j] = dist;
      distance_matrix_[j][i] = dist;  // mirror to lower triangle
    }
    distance_matrix_[i][i] = 0.0;  // diagonal is zero
  }

  size_t num_obs = x_.size();

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
    int f_idx = mst_edges[i].first;
    int t_idx = mst_edges[i].second;
    if (f_idx == t_idx) {
      continue;
    }

    double cost = distance_matrix_[f_idx][t_idx];

    std::vector<double> x;
    std::vector<double> y;
    x.push_back(x_[f_idx]);
    y.push_back(y_[f_idx]);
    x.push_back(x_[t_idx]);
    y.push_back(y_[t_idx]);

    this->lines_[i].add(x, y);
    weights.push_back(cost);
  }
}

MST::~MST() {}

std::vector<Line> MST::get_lines() const { return lines_; }
