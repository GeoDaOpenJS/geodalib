#ifndef REGRESSION_H
#define REGRESSION_H

#include <string>
#include <vector>

// forward declaration geoda::GalElement, DiagnosticReport
class DiagnosticReport;

namespace geoda {

class GalElement;

/**
 * @brief Compute the dot product of two vectors
 *
 * @return double The dot product
 */
double dot_product(const std::vector<double> &x, const std::vector<double> &y);

bool classicalRegression(geoda::GalElement *g, int num_obs, double *Y, int dim, double **X, int expl,
                         DiagnosticReport *dr, bool InclConstant, bool m_moranz, bool do_white_test);

/**
 * @brief linear regression function, which takes the dependent variable y, the independent variables x, and the weights
 * for spatial diagnostics
 *
 *
 */
std::string linear_regression(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                              const std::vector<std::vector<unsigned int>> &weights, const std::string &y_name,
                              const std::vector<std::string> &x_names, const std::string &dataset_name,
                              const std::vector<unsigned int> &y_undefs,
                              const std::vector<std::vector<unsigned int>> &x_undefs);
};  // namespace geoda

#endif  // REGRESSION_H
