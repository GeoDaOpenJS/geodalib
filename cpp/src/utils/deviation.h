#ifndef DEVIATION_H
#define DEVIATION_H

#include <cmath>
#include <stdexcept>
#include <vector>

namespace geoda {

/**
 * @brief Computes deviation from mean for each element in the data vector
 *
 * This function calculates the mean of all defined values (where undef[i] is false)
 * and then subtracts this mean from each defined value in-place.
 *
 * @param data Vector of double values to process (modified in-place)
 * @param undef Vector of boolean flags indicating undefined values (true = undefined)
 *
 * @throws std::invalid_argument if vectors have different sizes
 * @throws std::runtime_error if no defined values are found
 */
inline void deviation_from_mean(std::vector<double>& data, const std::vector<bool>& undef) {
  // Input validation
  if (data.size() != undef.size()) {
    throw std::invalid_argument("Data and undef vectors must have the same size");
  }

  if (data.empty()) {
    return;  // Nothing to process
  }

  // Calculate mean of defined values
  double sum = 0.0;
  int n = 0;

  for (size_t i = 0; i < data.size(); ++i) {
    if (!undef[i]) {  // Process defined values only
      // Check for valid numbers
      if (std::isfinite(data[i])) {
        sum += data[i];
        n++;
      }
    }
  }

  // Check if we have any valid data points
  if (n == 0) {
    throw std::runtime_error("No defined values found in the data");
  }

  const double mean = sum / n;

  // Subtract mean from each defined value
  for (size_t i = 0; i < data.size(); ++i) {
    if (!undef[i] && std::isfinite(data[i])) {
      data[i] -= mean;
    }
  }
}

// wrapper function for WASM since boolean vector is not supported
inline void deviation_from_mean_wasm(std::vector<double>& data, const std::vector<unsigned int>& undef) {
  std::vector<bool> undef_bool(undef.size());
  for (size_t i = 0; i < undef.size(); ++i) {
    undef_bool[i] = undef[i] != 0;
  }
  deviation_from_mean(data, undef_bool);
}

}  // namespace geoda

#endif  // DEVIATION_H
