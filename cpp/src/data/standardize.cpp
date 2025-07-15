// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include "data/data.h"

std::vector<double> geoda::standardize_data_wasm(const std::vector<double>& data,
                                                 const std::vector<unsigned int>& undefs) {
  const size_t n = data.size();

  // Handle edge cases
  if (n == 0 || n != undefs.size()) {
    return data;
  }

  // First pass: calculate mean and count valid values
  double sum = 0.0;
  size_t valid_count = 0;

  for (size_t i = 0; i < n; ++i) {
    if (undefs[i] == FALSE) {
      sum += data[i];
      ++valid_count;
    }
  }

  // Handle edge cases: no valid data or only one valid value
  if (valid_count <= 1) {
    return data;  // Cannot standardize with 0 or 1 valid values
  }

  const double mean = sum / static_cast<double>(valid_count);

  // Second pass: calculate variance using numerically stable method
  double variance_sum = 0.0;
  for (size_t i = 0; i < n; ++i) {
    if (undefs[i] == FALSE) {
      const double diff = data[i] - mean;
      variance_sum += diff * diff;
    }
  }

  const double variance = variance_sum / static_cast<double>(valid_count - 1);
  const double std_dev = std::sqrt(variance);

  // Create result vector
  std::vector<double> result(n);

  // Third pass: standardize the data
  if (std_dev == 0.0) {
    // All valid values are the same - return mean-centered data
    for (size_t i = 0; i < n; ++i) {
      if (undefs[i] == FALSE) {
        result[i] = data[i];  // Keep undefined values unchanged
      } else {
        result[i] = 0.0;  // All values become 0 after standardization
      }
    }
  } else {
    // Standard case: subtract mean and divide by standard deviation
    for (size_t i = 0; i < n; ++i) {
      if (undefs[i] == FALSE) {
        result[i] = (data[i] - mean) / std_dev;
      } else {
        result[i] = data[i];  // Keep undefined values unchanged
      }
    }
  }

  return result;
}
