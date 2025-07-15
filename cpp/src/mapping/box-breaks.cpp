// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <algorithm>
#include <limits>
#include <vector>

#include "mapping/mapping.h"

/**
 * @brief Calculates box plot breaks using IQR (Interquartile Range) method
 *
 * This function computes break points for box plot visualization using either 1.5 or 3.0 IQR.
 * The breaks include:
 * - Lower outlier threshold (Q1 - IQR_factor * IQR)
 * - First quartile (Q1, 25th percentile)
 * - Median (Q2, 50th percentile)
 * - Third quartile (Q3, 75th percentile)
 * - Upper outlier threshold (Q3 + IQR_factor * IQR)
 *
 * @param data Vector of numerical values to analyze
 * @param undefs Vector indicating which values in data are undefined (1 = undefined, 0 = defined)
 * @param iqr_factor Multiplier for IQR to determine outlier thresholds (typically 1.5 or 3.0)
 * @return std::vector<double> Vector of break points in ascending order
 */
std::vector<double> geoda::box_breaks(const std::vector<double>& data, const std::vector<int>& undefs,
                                      double iqr_factor) {
  // Early return for empty or too small datasets
  if (data.empty() || data.size() != undefs.size()) {
    return std::vector<double>();
  }

  int num_obs = data.size();
  double min_val = std::numeric_limits<double>::max();
  double max_val = std::numeric_limits<double>::lowest();

  // First pass: count valid elements and find min/max
  int valid_count = 0;
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i]) continue;
    min_val = std::min(min_val, data[i]);
    max_val = std::max(max_val, data[i]);
    ++valid_count;
  }

  // Pre-allocate vector capacity
  std::vector<std::pair<double, int>> var;
  var.reserve(valid_count);

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

  // Pre-allocate breaks vector
  std::vector<double> breaks;
  breaks.reserve(5);
  breaks.push_back(lower);
  breaks.push_back(Q1);
  breaks.push_back(Q2);
  breaks.push_back(Q3);
  breaks.push_back(upper);

  return breaks;
}
