// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include <cmath>

#include "data/data.h"

std::vector<double> geoda::range_standardize(const std::vector<double>& data, const std::vector<unsigned int>& undef) {
  std::vector<double> results(data);

  // Validate input
  if (results.size() != undef.size()) {
    throw std::invalid_argument("Data and undefined vectors must have the same size");
  }

  if (results.empty()) {
    return results;
  }

  // Find min and max values among defined data
  double min_val = DBL_MAX, max_val = -DBL_MAX;
  bool has_valid_data = false;

  for (size_t i = 0; i < results.size(); ++i) {
    if (undef[i] == TRUE) continue;

    has_valid_data = true;
    if (results[i] < min_val) {
      min_val = results[i];
    }
    if (results[i] > max_val) {  // Fixed: separate if statement, not else if
      max_val = results[i];
    }
  }

  // Check if we have any valid data
  if (!has_valid_data) {
    throw std::runtime_error("All values are undefined - cannot perform range standardization");
  }

  // Standardize data to [0, 1] range
  double range_val = max_val - min_val;

  if (range_val == 0.0) {
    // All valid values are the same - set them all to 0.0
    for (size_t i = 0; i < results.size(); ++i) {
      if (undef[i] == FALSE) {
        results[i] = 0.0;
      }
    }
  } else {
    // Normal case: subtract min and divide by range
    for (size_t i = 0; i < results.size(); ++i) {
      if (undef[i] == FALSE) {
        results[i] = (results[i] - min_val) / range_val;
      }
    }
  }

  return results;
}
