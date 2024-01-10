

#include "statistics/local-statistics.h"

#include <boost/random.hpp>

using namespace geoda;

std::vector<double> geoda::standardize_data(const std::vector<double>& data) {
  size_t n = data.size();
  if (n <= 1) {
    return data;
  }

  std::vector<double> result(n);

  // deviationFromMean
  double sum = 0.0;
  for (size_t i = 0; i < n; ++i) {
    sum += data[i];
  }
  const double mean = sum / n;
  for (size_t i = 0; i < n; ++i) {
    result[i] = data[i] - mean;
  }

  double ssum = 0.0;
  for (size_t i = 0; i < n; ++i) {
    ssum += result[i] * result[i];
  }
  const double sd = sqrt(ssum / static_cast<double>(n - 1.0));
  for (size_t i = 0; i < n; ++i) {
    if (sd != 0) {
      result[i] = result[i] / sd;
    }
  }

  return result;
}
