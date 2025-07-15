// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <algorithm>

#include "mapping/mapping.h"

// implementation of percentile breaks
std::vector<double> geoda::percentile_breaks(const std::vector<double>& data, const std::vector<int>& undefs) {
  int num_obs = data.size();
  std::vector<std::pair<double, int> > var;
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i] == 1) continue;
    var.push_back(std::make_pair(data[i], i));
  }
  std::sort(var.begin(), var.end(), geoda::dbl_int_pair_cmp_less);

  std::vector<double> breaks(5);
  breaks[0] = geoda::percentile(1.0, var);
  breaks[1] = geoda::percentile(10.0, var);
  breaks[2] = geoda::percentile(50.0, var);
  breaks[3] = geoda::percentile(90.0, var);
  breaks[4] = geoda::percentile(99.0, var);

  return breaks;
}
