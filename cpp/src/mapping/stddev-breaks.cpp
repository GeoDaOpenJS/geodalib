// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <algorithm>
#include <limits>
#include <vector>

#include "mapping/mapping.h"

// implementation of standard deviation breaks
std::vector<double> geoda::std_dev_breaks(const std::vector<double>& data, const std::vector<int>& undefs) {
  int num_obs = data.size();
  double min_val = std::numeric_limits<double>::max();
  double max_val = std::numeric_limits<double>::lowest();
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i] == 1) continue;
    min_val = std::min(min_val, data[i]);
    max_val = std::max(max_val, data[i]);
  }

  double mean = 0.0;
  int num_valid = 0;
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i] == 1) continue;
    mean += data[i];
    num_valid++;
  }
  mean /= num_valid;

  // compute sum_squares
  double sum_squares = 0.0;
  for (int i = 0; i < num_obs; ++i) {
    if (undefs[i] == 1) continue;
    sum_squares += data[i] * data[i];
  }

  // compute variance without bessel
  double variance = sum_squares / num_valid - mean * mean;

  // update variance with bessel
  variance = num_valid > 1 ? variance * num_valid / (num_valid - 1) : variance;

  double stddev = sqrt(variance);

  std::vector<double> breaks;
  // add mean - 2 * stddev
  breaks.push_back(mean - 2 * stddev);
  // add mean - stddev
  breaks.push_back(mean - stddev);
  // add mean
  breaks.push_back(mean);
  // add mean + stddev
  breaks.push_back(mean + stddev);
  // add mean + 2 * stddev
  breaks.push_back(mean + 2 * stddev);

  return breaks;
}
