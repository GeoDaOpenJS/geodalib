#include <algorithm>
#include <limits>
#include <vector>

#include "mapping/mapping.h"

// implementation of box breaks with 1.5 or 3.0 IQR
std::vector<double> geoda::box_breaks(const std::vector<double>& data, const std::vector<int>& undefs,
                                      double iqr_factor) {
  int num_obs = data.size();
  double min_val = std::numeric_limits<double>::max();
  double max_val = std::numeric_limits<double>::lowest();
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i]) continue;
    min_val = std::min(min_val, data[i]);
    max_val = std::max(max_val, data[i]);
  }

  std::vector<std::pair<double, int> > var;
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i] == 1) continue;
    var.push_back(std::make_pair(data[i], i));
  }
  std::sort(var.begin(), var.end(), geoda::dbl_int_pair_cmp_less);

  int N = var.size();
  double Q1 = geoda::percentile(25.0, var);
  double Q2 = geoda::percentile(50.0, var);
  double Q3 = geoda::percentile(75.0, var);
  double IQR = Q3 - Q1;
  double lower = Q1 - iqr_factor * IQR;
  double upper = Q3 + iqr_factor * IQR;

  std::vector<double> breaks;
  // lower outlier
  breaks.push_back(lower);
  // < 25%
  breaks.push_back(Q1);
  // 25% - 50%
  breaks.push_back(Q2);
  // 50% - 75%
  breaks.push_back(Q3);
  // > 75%
  breaks.push_back(upper);

  return breaks;
}
