#include "sa/lisa.h"

geoda::LisaResult geoda::local_g(const std::vector<double>& data,
                                 const std::vector<std::vector<unsigned int>>& neighbors, unsigned int num_permutations,
                                 bool is_gstar) {
  size_t n = neighbors.size();
  LisaResult result(n);

  // NOTE: don't standardize data for local G
  // get sum_x of data
  double sum_x = 0;
  for (size_t i = 0; i < n; ++i) {
    sum_x += data[i];
  }

  // compute spatial lag values
  for (size_t i = 0; i < n; ++i) {
    double lag = 0;
    size_t n_nbrs = neighbors[i].size();
    const std::vector<unsigned int>& nbrs = neighbors[i];
    for (size_t j = 0; j < n_nbrs; ++j) {
      if (i != nbrs[j]) {
        lag += data[nbrs[j]];
      }
    }
    if (n_nbrs == 0) {
      result.cluster_values[i] = LocalMoranClusterType::NEIGHBORLESS;
    } else {
      double xd_i = sum_x - data[i];
      if (is_gstar) {
        // include self in the calculation
        lag += data[i];
        n_nbrs += 1;
        xd_i = sum_x;
      }
      lag = lag / n_nbrs;
      result.lag_values[i] = lag;
      if (xd_i == 0) {
        result.lisa_values[i] = 0;
        result.cluster_values[i] = LocalMoranClusterType::UNDEFINED;
      } else {
        result.lisa_values[i] = lag / xd_i;
      }
    }
  }

  // get mean_g value
  double mean_g = 0;
  size_t n_g = 0;
  for (size_t i = 0; i < n; ++i) {
    if (neighbors[i].size() > 0) {
      mean_g += result.lisa_values[i];
      n_g += 1;
    }
  }
  mean_g = mean_g / n_g;

  // assign cluster values
  for (size_t i = 0; i < n; ++i) {
    if (result.cluster_values[i] == LocalMoranClusterType::NEIGHBORLESS ||
        result.cluster_values[i] == LocalMoranClusterType::UNDEFINED) {
      continue;
    }
    double lag = result.lag_values[i];
    if (result.lisa_values[i] >= mean_g) {
      result.cluster_values[i] = LocalMoranClusterType::HH;
    } else {
      result.cluster_values[i] = LocalMoranClusterType::LL;
    }
  }

  geoda::runPermutation(data, neighbors, num_permutations, result);
  return result;
}