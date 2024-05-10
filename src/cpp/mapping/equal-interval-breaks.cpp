#include <algorithm>
#include <limits>
#include <vector>

#include "mapping/mapping.h"

// implementation of equal interval breaks
std::vector<double> geoda::equal_interval_breaks(int k, const std::vector<double>& data,
                                                 const std::vector<int>& undefs) {
  double min_val = std::numeric_limits<double>::max();
  double max_val = std::numeric_limits<double>::lowest();
  for (int i = 0; i < data.size(); ++i) {
    if (undefs[i] == 1) continue;
    min_val = std::min(min_val, data[i]);
    max_val = std::max(max_val, data[i]);
  }
  double interval = (max_val - min_val) / k;
  std::vector<double> breaks(k - 1);
  for (int i = 0; i < k - 1; ++i) {
    breaks[i] = min_val + (i + 1) * interval;
  }
  return breaks;
}
