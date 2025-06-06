#ifndef GEODA_STANDARDIZE_H
#define GEODA_STANDARDIZE_H

#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>

namespace geoda {

/**
 * Standardizes data by subtracting the mean and dividing by the standard deviation.
 * Values marked as undefined in the undefs vector are left unchanged.
 *
 * @param data The input data vector
 * @param undefs Boolean vector indicating which values are undefined (true = undefined)
 * @return Standardized data vector
 */
inline std::vector<double> standardize_data(const std::vector<double>& data, const std::vector<bool>& undefs) {
  const size_t n = data.size();

  // Handle edge cases
  if (n == 0 || n != undefs.size()) {
    return data;
  }

  // First pass: calculate mean and count valid values
  double sum = 0.0;
  size_t valid_count = 0;

  for (size_t i = 0; i < n; ++i) {
    if (!undefs[i]) {
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
    if (!undefs[i]) {
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
      if (undefs[i]) {
        result[i] = data[i];  // Keep undefined values unchanged
      } else {
        result[i] = 0.0;  // All values become 0 after standardization
      }
    }
  } else {
    // Standard case: subtract mean and divide by standard deviation
    for (size_t i = 0; i < n; ++i) {
      if (undefs[i]) {
        result[i] = data[i];  // Keep undefined values unchanged
      } else {
        result[i] = (data[i] - mean) / std_dev;
      }
    }
  }

  return result;
}

// wrapper function for WASM since boolean vector is not supported
inline void standardize_data_wasm(const std::vector<double>& data, const std::vector<unsigned int>& undef) {
  std::vector<bool> undef_bool(undef.size());
  for (size_t i = 0; i < undef.size(); ++i) {
    undef_bool[i] = undef[i] != 0;
  }
  standardize_data(data, undef_bool);
}

}  // namespace geoda

#endif
