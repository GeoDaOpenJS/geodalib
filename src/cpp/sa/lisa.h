#ifndef GEODA_LOCAL_STATISTICS_H
#define GEODA_LOCAL_STATISTICS_H

#include <vector>

namespace geoda {

enum LocalMoranClusterType { HH = 1, LL = 2, HL = 3, LH = 4, NEIGHBORLESS = 5 };

std::vector<double> standardize_data(const std::vector<double>& data);

std::vector<std::vector<unsigned int>> create_perm_table(const std::vector<std::vector<unsigned int>>& neighbors,
                                                         unsigned int num_permutations, unsigned int max_num_neighbors);

struct LisaResult {
  explicit LisaResult(unsigned int n) : is_valid(false) {
    p_values.resize(n);
    cluster_values.resize(n);
    lag_values.resize(n);
    lisa_values.resize(n);
  }
  bool is_valid;
  std::vector<double> p_values;
  std::vector<unsigned int> cluster_values;
  std::vector<double> lag_values;
  std::vector<double> lisa_values;

  bool get_is_valid() const { return is_valid; }
  std::vector<double> get_pvalues() const { return p_values; }
  std::vector<unsigned int> get_clusters() const { return cluster_values; }
  std::vector<double> get_lags() const { return lag_values; }
  std::vector<double> get_lisas() const { return lisa_values; }
};

LisaResult local_moran(const std::vector<double>& data, const std::vector<std::vector<unsigned int>>& neighbors,
                       unsigned int num_permutations);
}  // namespace geoda

#endif  // GEODA_LOCAL_STATISTICS_H
