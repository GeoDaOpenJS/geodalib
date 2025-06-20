#include "data/data.h"

std::vector<double> geoda::standardize_mad(const std::vector<double>& data, const std::vector<unsigned int>& undef) {
  std::vector<double> results(data);

  if (results.size() != undef.size()) {
    throw std::invalid_argument("Data and undefined flag vectors must have the same size");
  }

  if (results.empty()) {
    return results;
  }

  // First pass: calculate mean of valid values
  double sum = 0.0;
  size_t nValid = 0;

  for (size_t i = 0; i < results.size(); ++i) {
    if (undef[i] == FALSE) {
      sum += results[i];
      ++nValid;
    }
  }

  // Need at least one valid value
  if (nValid == 0) {
    return results;
  }

  const double mean = sum / nValid;

  // Second pass: calculate Mean Absolute Deviation
  double madSum = 0.0;
  for (size_t i = 0; i < results.size(); ++i) {
    if (undef[i] == FALSE) {
      madSum += std::abs(results[i] - mean);
    }
  }

  const double mad = madSum / nValid;

  // Cannot standardize if MAD is zero (all values are identical)
  if (mad == 0.0) {
    return results;
  }

  // Third pass: standardize the data
  for (size_t i = 0; i < results.size(); ++i) {
    if (undef[i] == FALSE) {
      results[i] = (results[i] - mean) / mad;
    }
  }

  return results;
}
