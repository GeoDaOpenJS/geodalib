#ifndef GEODA_MAPPING_H
#define GEODA_MAPPING_H
#include <limits>
#include <utility>
#include <vector>

typedef std::pair<double, int> dbl_int_pair_type;
typedef std::vector<dbl_int_pair_type> dbl_int_pair_vec_type;

namespace geoda {
// define a static constant of random seed
static const unsigned int USER_SEED = 123456789;

bool dbl_int_pair_cmp_less(const dbl_int_pair_type& ind1, const dbl_int_pair_type& ind2);

double percentile(double x, const dbl_int_pair_vec_type& v);

// std::vector<std::vector<double> > demean(const std::vector<std::vector<double> >& data);

// std::vector<std::vector<double> > standardize(const std::vector<std::vector<double> >& data);

// std::vector<std::vector<double> > standardize_mad(const std::vector<std::vector<double> >& data);

/**
 * @brief Compute natural breaks for a given data set and number of classes
 *
 * @param k The number of classes/categroies
 * @param data The data values
 * @param undefs The flags indicating which data value is undefined
 * @return std::vector<double> The values of natural breaks
 */
std::vector<double> natural_breaks(int k, const std::vector<double>& data, const std::vector<int>& undefs);

/**
 * @brief Compute quantile breaks for a given data set and number of classes
 *
 * @param k The number of classes/categroies
 * @param data The data values
 * @param undefs The flags indicating which data value is undefined
 * @return std::vector<double> The values of quantile breaks
 */
std::vector<double> quantile_breaks(int k, const std::vector<double>& data, const std::vector<int>& undefs);

/**
 * @brief Compute Box breaks with 1.5 or 3.0 IQR for a given data set
 *
 * @param data  The data values
 * @param undefs The flags indicating which data value is undefined
 * @param iqr_factor The factor of IQR, default is 1.5, or 3.0
 * @return std::vector<double>  The values of Box breaks with 1.5 IQR
 */
std::vector<double> box_breaks(const std::vector<double>& data, const std::vector<int>& undefs,
                               double iqr_factor = 1.5);

/**
 * @brief Compute percentile breaks for a given data set
 *
 * @param data The data values
 * @param undefs The flags indicating which data value is undefined
 * @return std::vector<double> The values of percentile breaks
 */
std::vector<double> percentile_breaks(const std::vector<double>& data, const std::vector<int>& undefs);

/**
 * @brief  Compute equal interval breaks for a given data set and number of classes
 *
 * @param k The number of classes
 * @param data The data values
 * @param undefs The flags indicating which data value is undefined
 * @return std::vector<double> The values of equal interval breaks
 */
std::vector<double> equal_interval_breaks(int k, const std::vector<double>& data, const std::vector<int>& undefs);

/**
 * @brief Compute standard deviation breaks for a given data set
 * 
 * @param data The data values
 * @param undefs The flags indicating which data value is undefined
 * @return std::vector<double> The values of standard deviation breaks
 */
std::vector<double> std_dev_breaks(const std::vector<double>& data, const std::vector<int>& undefs);

// void transform_inplace(std::vector<double>& vals, const std::string& method);

// bool rateStandardizeEB(const std::vector<double>& P, const std::vector<double>& E, std::vector<double>& results,
//                        std::vector<bool>& undefined);
}  // namespace geoda

#endif  // GEODA_MAPPING_H
