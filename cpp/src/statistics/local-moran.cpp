

#include <boost/random.hpp>

#include "statistics/local-statistics.h"

using namespace geoda;

std::vector<std::vector<unsigned int>> geoda::create_perm_table(
    const std::vector<std::vector<unsigned int>>& neighbors, unsigned int num_permutations,
    unsigned int max_num_neighbors) {
  size_t n = neighbors.size();
  std::vector<std::vector<unsigned int>> table(num_permutations);

  // lookup table for non-duplicated random neighbors
  char* flags = new char[n];
  memset(flags, '\x0', n);

  // random number generator with fixed seed 1234 for replicable results
  boost::random::mt19937 rng(1234);
  // upper bound: n-2, self-excluded
  boost::random::uniform_int_distribution<> random_number(0, n - 2);

  std::vector<int> random_neighbors(max_num_neighbors, 0);

  for (size_t i = 0; i < num_permutations; ++i) {
    unsigned int num_nbrs = 0;
    // get non-duplicated random neighbors: size = max_num_neighbors
    while (num_nbrs < max_num_neighbors) {
      int rng_value = random_number(rng);
      if (flags[rng_value] == '\x0') {
        flags[rng_value] = '\x1';
        random_neighbors[num_nbrs] = rng_value;
        num_nbrs += 1;
      }
    }
    table[i].resize(max_num_neighbors);
    for (size_t j = 0; j < max_num_neighbors; ++j) {
      table[i][j] = random_neighbors[j];
      flags[random_neighbors[j]] = '\x0';
    }
  }

  delete[] flags;
  return table;
}

LisaResult geoda::local_moran(const std::vector<double>& data, const std::vector<std::vector<unsigned int>>& neighbors,
                               unsigned int num_permutations) {
  size_t n = neighbors.size();
  LisaResult result(n);

  // standardize data
  std::vector<double> std_data = standardize_data(data);

  // compute spatial lag values
  for (size_t i = 0; i < n; ++i) {
    double lag = 0;
    size_t n_nbrs = neighbors[i].size();
    const std::vector<unsigned int>& nbrs = neighbors[i];
    for (size_t j = 0; j < n_nbrs; ++j) {
      lag += std_data[nbrs[j]];
    }
    if (n_nbrs == 0) {
      result.cluster_values[i] = LocalMoranClusterType::NEIGHBORLESS;
    } else {
      lag = lag / n_nbrs;
      result.lag_values[i] = lag;
      result.lisa_values[i] = lag * std_data[i];
      if (std_data[i] > 0 && lag > 0) {
        result.cluster_values[i] = LocalMoranClusterType::HH;
      } else if (std_data[i] > 0 && lag <= 0) {
        result.cluster_values[i] = LocalMoranClusterType::HL;
      } else if (std_data[i] <= 0 && lag > 0) {
        result.cluster_values[i] = LocalMoranClusterType::LH;
      } else {
        result.cluster_values[i] = LocalMoranClusterType::LL;
      }
    }
  }

  // get maximum number of neighbors
  size_t max_num_neighbors = 0;
  for (size_t i = 0; i < n; ++i) {
    size_t n_nbrs = neighbors[i].size();
    if (n_nbrs > max_num_neighbors) {
      max_num_neighbors = n_nbrs;
    }
  }

  // build permutation table
  std::vector<std::vector<unsigned int>> perm_table = create_perm_table(neighbors, num_permutations, max_num_neighbors);

  // compute pseudo-p value
  for (size_t i = 0; i < n; ++i) {
    size_t num_nbrs = neighbors[i].size();
    if (num_nbrs == 0) {
      continue;
    }
    size_t count_larger_lag = 0;
    for (size_t p = 0; p < num_permutations; ++p) {
      double perm_lag = 0;
      for (size_t j = 0; j < num_nbrs; ++j) {
        unsigned int nbr_idx = perm_table[p][j];
        // self should be excluded from random neighbors
        // by adding 1 to the rest of the random neighbor indices
        // e.g. 1 has neighbors 3, 4, 1, 9, 7 ->
        // 1 has neighbors 3, 4, 2, 10, 8
        if (nbr_idx >= i) nbr_idx += 1;
        perm_lag += std_data[nbr_idx];
      }
      perm_lag = perm_lag / num_nbrs;
      if (perm_lag >= result.lag_values[i]) {
        count_larger_lag += 1;
      }
    }
    // two-tail: pick the smaller counts
    if (num_permutations - count_larger_lag <= count_larger_lag) {
      count_larger_lag = num_permutations - count_larger_lag;
    }
    double pseudo_pval = static_cast<double>(count_larger_lag + 1) / static_cast<double>(num_permutations + 1);
    result.p_values[i] = pseudo_pval;
  }

  result.is_valid = true;
  return result;
}
