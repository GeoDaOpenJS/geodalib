#ifndef REGRESSION_H
#define REGRESSION_H

#include <string>
#include <vector>

// forward declaration geoda::GalElement, DiagnosticReport
class DiagnosticReport;

namespace geoda {

class GalElement;

// An enum to represent the regression model 0 = ols 1 = spatial lag, 2 = spatial error
enum RegressionModel { OLS = 0, SPATIAL_LAG = 1, SPATIAL_ERROR = 2 };

/**
 * @brief Compute the dot product of two vectors
 *
 * @return double The dot product
 */
double dot_product(const std::vector<double> &x, const std::vector<double> &y);

bool classicalRegression(geoda::GalElement *g, int num_obs, double *Y, int dim, double **X, int expl,
                         DiagnosticReport *dr, bool InclConstant, bool m_moranz, bool do_white_test);

bool spatialLagRegression(geoda::GalElement *g, int num_obs, double *Y, int dim, double **X, int deps,
                          DiagnosticReport *dr, bool InclConstant);

bool spatialErrorRegression(geoda::GalElement *g, int num_obs, double *Y, int dim, double **XX, int deps,
                            DiagnosticReport *rr, bool InclConstant);

/**
 * @brief linear regression function, which takes the dependent variable y, the independent variables x, and the weights
 * for spatial diagnostics
 *
 *
 */
DiagnosticReport ols(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                     const std::vector<std::vector<unsigned int>> &weights,
                     const std::vector<std::vector<double>> &weights_values, const std::string &y_name,
                     const std::vector<std::string> &x_names, const std::string &dataset_name,
                     const std::vector<unsigned int> &y_undefs, const std::vector<std::vector<unsigned int>> &x_undefs);

DiagnosticReport spatial_lag(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                             const std::vector<std::vector<unsigned int>> &weights,
                             const std::vector<std::vector<double>> &weights_values, const std::string &y_name,
                             const std::vector<std::string> &x_names, const std::string &dataset_name,
                             const std::vector<unsigned int> &y_undefs,
                             const std::vector<std::vector<unsigned int>> &x_undefs);

DiagnosticReport spatial_error(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                               const std::vector<std::vector<unsigned int>> &weights,
                               const std::vector<std::vector<double>> &weights_values, const std::string &y_name,
                               const std::vector<std::string> &x_names, const std::string &dataset_name,
                               const std::vector<unsigned int> &y_undefs,
                               const std::vector<std::vector<unsigned int>> &x_undefs);

DiagnosticReport regression_helper(RegressionModel regress_model, const std::vector<double> &dep,
                                   const std::vector<std::vector<double>> &indeps,
                                   const std::vector<std::vector<unsigned int>> &weights,
                                   const std::vector<std::vector<double>> &weights_values, const std::string &y_name,
                                   const std::vector<std::string> &x_names, const std::string &dataset_name,
                                   const std::vector<unsigned int> &y_undefs,
                                   const std::vector<std::vector<unsigned int>> &x_undefs);
};  // namespace geoda

#endif  // REGRESSION_H
