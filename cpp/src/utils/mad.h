#ifndef MAD_H
#define MAD_H

#include <cmath>
#include <stdexcept>
#include <vector>

namespace geoda {

/**
 * Standardizes data using Mean Absolute Deviation (MAD) normalization.
 * For each valid data point, applies the transformation: (x - mean) / mad
 *
 * @param data Vector of double values to be standardized (modified in-place)
 * @param undef Vector of boolean flags indicating undefined/invalid values
 * @return true if standardization was performed, false if insufficient valid data
 * @throws std::invalid_argument if data and undef vectors have different sizes
 */
inline bool standardize_mad(std::vector<double>& data, const std::vector<bool>& undef) {
  if (data.size() != undef.size()) {
    throw std::invalid_argument("Data and undefined flag vectors must have the same size");
  }

  if (data.empty()) {
    return false;
  }

  // First pass: calculate mean of valid values
  double sum = 0.0;
  size_t nValid = 0;

  for (size_t i = 0; i < data.size(); ++i) {
    if (!undef[i]) {
      sum += data[i];
      ++nValid;
    }
  }

  // Need at least one valid value
  if (nValid == 0) {
    return false;
  }

  const double mean = sum / nValid;

  // Second pass: calculate Mean Absolute Deviation
  double madSum = 0.0;
  for (size_t i = 0; i < data.size(); ++i) {
    if (!undef[i]) {
      madSum += std::abs(data[i] - mean);
    }
  }

  const double mad = madSum / nValid;

  // Cannot standardize if MAD is zero (all values are identical)
  if (mad == 0.0) {
    return false;
  }

  // Third pass: standardize the data
  for (size_t i = 0; i < data.size(); ++i) {
    if (!undef[i]) {
      data[i] = (data[i] - mean) / mad;
    }
  }

  return true;
}

// wrapper function for WASM since boolean vector is not supported
inline void standardize_mad_wasm(std::vector<double>& data, const std::vector<unsigned int>& undef) {
  std::vector<bool> undef_bool(undef.size());
  for (size_t i = 0; i < undef.size(); ++i) {
    undef_bool[i] = undef[i] != 0;
  }
  standardize_mad(data, undef_bool);
}

}  // namespace geoda

#endif  // MAD_H
