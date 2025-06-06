#ifndef RANGE_STANDARDIZE_H
#define RANGE_STANDARDIZE_H

#include <float.h>

#include <stdexcept>
#include <vector>

namespace geoda {

/**
 * Standardizes the range of data to [0, 1] by subtracting the minimum value
 * and dividing by the range (max - min).
 *
 * @param data Vector of double values to be standardized (modified in-place)
 * @param undef Vector of boolean flags indicating undefined values
 * @throws std::invalid_argument if vectors have different sizes
 * @throws std::runtime_error if all values are undefined or no valid data exists
 */
inline void range_standardize(std::vector<double>& data, std::vector<bool>& undef) {
  // Validate input
  if (data.size() != undef.size()) {
    throw std::invalid_argument("Data and undefined vectors must have the same size");
  }

  if (data.empty()) {
    return;  // Nothing to process
  }

  // Find min and max values among defined data
  double min_val = DBL_MAX, max_val = -DBL_MAX;
  bool has_valid_data = false;

  for (size_t i = 0; i < data.size(); ++i) {
    if (undef[i]) continue;

    has_valid_data = true;
    if (data[i] < min_val) {
      min_val = data[i];
    }
    if (data[i] > max_val) {  // Fixed: separate if statement, not else if
      max_val = data[i];
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
    for (size_t i = 0; i < data.size(); ++i) {
      if (!undef[i]) {
        data[i] = 0.0;
      }
    }
  } else {
    // Normal case: subtract min and divide by range
    for (size_t i = 0; i < data.size(); ++i) {
      if (!undef[i]) {
        data[i] = (data[i] - min_val) / range_val;
      }
    }
  }
}

// wrapper function for WASM since boolean vector is not supported
inline void range_standardize_wasm(std::vector<double>& data, const std::vector<unsigned int>& undef) {
  std::vector<bool> undef_bool(undef.size());
  for (size_t i = 0; i < undef.size(); ++i) {
    undef_bool[i] = undef[i] != 0;
  }
  range_standardize(data, undef_bool);
}

}  // namespace geoda
#endif  // RANGE_STANDARDIZE_H
