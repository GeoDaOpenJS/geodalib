// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include <algorithm>
#include <limits>
#include <vector>

#include "mapping/mapping.h"

/**
 * @brief Calculates break points using the equal interval classification method
 *
 * This function divides the range of values into k equal-sized intervals.
 * It ignores undefined values when calculating the min and max values.
 *
 * @param k The number of classes/intervals desired
 * @param data Vector of numerical values to be classified
 * @param undefs Vector indicating which values in data are undefined (1=undefined, 0=defined)
 * @return std::vector<double> A vector of k-1 break points that define k intervals
 *
 * @note The returned breaks array will have size k-1, as k intervals are defined by k-1 break points
 * @note Values marked as undefined in undefs vector are excluded from min/max calculations
 */
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
