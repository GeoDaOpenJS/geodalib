#ifndef DATA_H
#define DATA_H

#include <cfloat>
#include <cmath>
#include <stdexcept>
#include <vector>

#include "geometry/geometry.h"

namespace geoda {

/**
 * @brief Computes deviation from mean for each element in the data vector
 *
 * This function calculates the mean of all defined values (where undef[i] is FALSE)
 * and then subtracts this mean from each defined value in-place.
 *
 * @param data Vector of double values to process (modified in-place)
 * @param undef Vector of unsigned int flags indicating undefined values (TRUE = undefined, FALSE = defined)
 * @return Vector of double values with the deviation from mean
 */
std::vector<double> deviation_from_mean(const std::vector<double>& data, const std::vector<unsigned int>& undef);

/**
 * @brief Standardizes data using Mean Absolute Deviation (MAD) normalization.
 *
 * @param data Vector of double values to be standardized (modified in-place)
 * @param undef Vector of unsigned int flags indicating undefined values (TRUE = undefined, FALSE = defined)
 * @return Vector of double values with the standard deviation normalized
 */
std::vector<double> standardize_mad(const std::vector<double>& data, const std::vector<unsigned int>& undef);

/**
 * @brief Adjusts the range of data to [0, 1] by subtracting the minimum value
 * and dividing by the range (max - min).
 *
 * @param data Vector of double values to be adjusted (modified in-place)
 * @param undef Vector of unsigned int flags indicating undefined values (TRUE = undefined, FALSE = defined)
 * @return Vector of double values with the range adjusted to [0, 1]
 */
std::vector<double> range_adjust(const std::vector<double>& data, const std::vector<unsigned int>& undef);

/**
 * Standardizes the range of data to [0, 1] by subtracting the minimum value
 * and dividing by the range (max - min).
 *
 * @param data Vector of double values to be standardized (modified in-place)
 * @param undef Vector of unsigned int flags indicating undefined values (TRUE = undefined, FALSE = defined)
 * @return Vector of double values with the range standardized to [0, 1]
 */
std::vector<double> range_standardize(const std::vector<double>& data, const std::vector<unsigned int>& undef);

/**
 * Standardizes data by subtracting the mean and dividing by the standard deviation.
 * Values marked as undefined in the undefs vector are left unchanged.
 *
 * @param data The input data vector
 * @param undefs Boolean vector indicating which values are undefined (TRUE = undefined, FALSE = defined)
 * @return Standardized data vector
 */
std::vector<double> standardize_data_wasm(const std::vector<double>& data, const std::vector<unsigned int>& undefs);

inline std::vector<double> standardize_data(const std::vector<double>& data, const std::vector<bool>& undefs) {
  std::vector<unsigned int> undef_int(undefs.size());
  for (size_t i = 0; i < undefs.size(); ++i) {
    undef_int[i] = undefs[i] ? 1 : 0;
  }
  return standardize_data_wasm(data, undef_int);
}

}  // namespace geoda

#endif  // DATA_H
