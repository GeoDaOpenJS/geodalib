// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include "data/data.h"

std::vector<double> geoda::deviation_from_mean(const std::vector<double>& data,
                                               const std::vector<unsigned int>& undef) {
  std::vector<double> results(data);

  // Input validation
  if (results.size() != undef.size()) {
    throw std::invalid_argument("Data and undef vectors must have the same size");
  }

  if (results.empty()) {
    return results;
  }

  // Calculate mean of defined values
  double sum = 0.0;
  int n = 0;

  for (size_t i = 0; i < results.size(); ++i) {
    if (undef[i] == FALSE) {  // Process defined values only
      // Check for valid numbers
      if (std::isfinite(results[i])) {
        sum += results[i];
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
  for (size_t i = 0; i < results.size(); ++i) {
    if (undef[i] == FALSE && std::isfinite(results[i])) {
      results[i] -= mean;
    }
  }

  return results;
}
