#ifndef GEODA_DATA_H
#define GEODA_DATA_H

#include <algorithm>
#include <vector>
#include <iostream>

namespace geoda {

static double ThomasWangHashDouble(uint64_t key) {
  key = (~key) + (key << 21);  // key = (key << 21) - key - 1;
  key = key ^ (key >> 24);
  key = (key + (key << 3)) + (key << 8);  // key * 265
  key = key ^ (key >> 14);
  key = (key + (key << 2)) + (key << 4);  // key * 21
  key = key ^ (key >> 28);
  key = key + (key << 31);
  return 5.42101086242752217E-20 * key;
}

static std::vector<double> standardize_data(const std::vector<double>& data) {
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

static std::vector<double> standardize_data(const std::vector<double>& data, const std::vector<bool>& undefs) {
  size_t n = data.size();
  if (n <= 1) {
    return data;
  }

  std::vector<double> result(n);

  // deviationFromMean
  double sum = 0.0;
  int count = 0;
  for (size_t i = 0; i < n; ++i) {
    if (undefs[i] == true) continue;
    sum += data[i];
    count++;
  }
  const double mean = sum / count;
  for (size_t i = 0; i < n; ++i) {
    if (undefs[i] == true) {
      result[i] = data[i];
    } else {
      result[i] = data[i] - mean;
    }
  }

  double ssum = 0.0;
  for (size_t i = 0; i < n; ++i) {
    if (undefs[i] == true) continue;
    ssum += result[i] * result[i];
  }
  const double sd = sqrt(ssum / static_cast<double>(count - 1.0));
  for (size_t i = 0; i < n; ++i) {
    if (undefs[i] == true) {
      result[i] = data[i];
    } else {
      if (sd != 0) {
        result[i] = result[i] / sd;
      }
    }
  }

  return result;
}

}  // namespace geoda

#endif
