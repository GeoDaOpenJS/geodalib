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

std::vector<double> natural_breaks(int k, const std::vector<double>& data, const std::vector<int>& undefs);

std::vector<double> quantile_breaks(int k, const std::vector<double>& data, const std::vector<int>& undefs);

// std::vector<double> hinge15breaks(const std::vector<double>& data, const std::vector<bool>& undefs);

// std::vector<double> hinge30breaks(const std::vector<double>& data, const std::vector<bool>& undefs);

std::vector<double> percentilebreaks(const std::vector<double>& data, const std::vector<bool>& undefs);

// std::vector<double> stddevbreaks(const std::vector<double>& data, const std::vector<bool>& undefs);

// void transform_inplace(std::vector<double>& vals, const std::string& method);

// bool rateStandardizeEB(const std::vector<double>& P, const std::vector<double>& E, std::vector<double>& results,
//                        std::vector<bool>& undefined);
}  // namespace geoda

#endif  // GEODA_MAPPING_H
