#include "regression/regression.h"

#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>
#include <iostream>
#include <map>
#include <string>
#include <vector>

#include "regression/diagnostic-report.h"
#include "regression/lite2.h"
#include "weights/gal.h"

// Put it below gal.h since it uses boost::geometry which use std::abs that conflicts with abs in f2c.h
#include <blaswrap.h>
#include <f2c.h>

extern "C" double ddot_(integer *n, doublereal *dx, integer *incx, doublereal *dy, integer *incy);

double geoda::dot_product(const std::vector<double> &x, const std::vector<double> &y) {
  // convert x and y to arrays
  double *a = new double[x.size()];
  double *b = new double[y.size()];
  for (int i = 0; i < x.size(); i++) {
    a[i] = x[i];
  }
  for (int i = 0; i < y.size(); i++) {
    b[i] = y[i];
  }
  // run the dot product
  integer N = x.size(), one = 1;  // one really doesn't look good in C

  double dot_product = ddot_(&N, a, &one, b, &one);
  return dot_product;
}

DiagnosticReport geoda::ols(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                            const std::vector<std::vector<unsigned int>> &weights,
                            const std::vector<std::vector<double>> &weights_values, const std::string &dep_name,
                            const std::vector<std::string> &indep_names, const std::string &dataset_name,
                            const std::vector<unsigned int> &dep_undefs,
                            const std::vector<std::vector<unsigned int>> &indep_undefs) {
  // run the regression_helper with the classic regression model
  return geoda::regression_helper(geoda::RegressionModel::OLS, dep, indeps, weights, weights_values, dep_name,
                                  indep_names, dataset_name, dep_undefs, indep_undefs);
}

DiagnosticReport geoda::spatial_lag(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                                    const std::vector<std::vector<unsigned int>> &weights,
                                    const std::vector<std::vector<double>> &weights_values, const std::string &dep_name,
                                    const std::vector<std::string> &indep_names, const std::string &dataset_name,
                                    const std::vector<unsigned int> &dep_undefs,
                                    const std::vector<std::vector<unsigned int>> &indep_undefs) {
  // run the regression_helper with the spatial lag model
  return geoda::regression_helper(geoda::RegressionModel::SPATIAL_LAG, dep, indeps, weights, weights_values, dep_name,
                                  indep_names, dataset_name, dep_undefs, indep_undefs);
}

DiagnosticReport geoda::spatial_error(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                                      const std::vector<std::vector<unsigned int>> &weights,
                                      const std::vector<std::vector<double>> &weights_values,
                                      const std::string &dep_name, const std::vector<std::string> &indep_names,
                                      const std::string &dataset_name, const std::vector<unsigned int> &dep_undefs,
                                      const std::vector<std::vector<unsigned int>> &indep_undefs) {
  // run the regression_helper with the spatial error model
  return geoda::regression_helper(geoda::RegressionModel::SPATIAL_ERROR, dep, indeps, weights, weights_values, dep_name,
                                  indep_names, dataset_name, dep_undefs, indep_undefs);
}

DiagnosticReport geoda::regression_helper(RegressionModel regress_model, const std::vector<double> &dep,
                                          const std::vector<std::vector<double>> &indeps,
                                          const std::vector<std::vector<unsigned int>> &weights,
                                          const std::vector<std::vector<double>> &weights_values,
                                          const std::string &dep_name, const std::vector<std::string> &indep_names,
                                          const std::string &dataset_name, const std::vector<unsigned int> &dep_undefs,
                                          const std::vector<std::vector<unsigned int>> &indep_undefs) {
  // create a string to store the result
  int nX = indep_names.size() + 1;  // add constant term
  size_t m_obs = dep.size();
  size_t sz = indeps.size();

  double **dt = new double *[sz + 1];
  for (int i = 0; i < sz + 1; i++) {
    dt[i] = new double[m_obs];
  }

  std::vector<double> vec(m_obs);
  std::vector<bool> undefs;
  undefs.resize(m_obs);

  bool m_constant_term = true;
  bool m_WeightCheck = weights.empty();
  bool m_standardization = true;
  bool ignoreCase = true;
  // test with no time-variable
  int tm = 0;

  // get X variables
  for (int i = 0; i < sz; i++) {
    std::string x_name = indep_names[i];
    for (int j = 0; j < m_obs; j++) {
      dt[i][j] = indeps[i][j];
    }
    if (indep_undefs.size() == sz) {
      if (indep_undefs[i].size() == m_obs) {
        for (int j = 0; j < m_obs; j++) {
          undefs[j] = undefs[j] || indep_undefs[i][j];
        }
      }
    }
  }
  // get Y variable
  for (int j = 0; j < m_obs; j++) {
    dt[sz][j] = dep[j];
  }
  if (dep_undefs.size() == m_obs) {
    for (int j = 0; j < m_obs; j++) {
      undefs[j] = undefs[j] || dep_undefs[j];
    }
  }

  // get valid obs
  int valid_obs = 0;
  std::map<int, int> orig_valid_map;
  for (int i = 0; i < m_obs; i++) {
    if (!undefs[i]) {
      orig_valid_map[i] = valid_obs;
      valid_obs += 1;
    }
  }

  std::vector<std::string> x_names = indep_names;
  // prepend "CONSTANT" at the beginning of indep_names
  x_names.insert(x_names.begin(), "CONSTANT");
  int ix = 1, ixName = 1;

  double **x = new double *[x_names.size() + 1];  // the last one is for Y
  // set x[0] constant with 1.0 the memory with value 1.0
  x[0] = new double[valid_obs];
  for (int i = 0; i < valid_obs; i++) {
    x[0][i] = 1.0;
  }
  int nVarName = x_names.size() + ixName;
  for (int i = 0; i < sz + 1; i++) {
    x[i + ix] = new double[valid_obs];
    int xidx = 0;
    for (int j = 0; j < m_obs; j++) {
      if (undefs[j]) continue;
      x[i + ix][xidx++] = dt[i][j];
    }
  }
  double *y = new double[valid_obs];
  int yidx = 0;
  for (int j = 0; j < valid_obs; j++) {
    y[j] = x[sz + 1][j];
  }
  // free memory of dt[][]
  for (int j = 0; j < sz + 1; j++) delete[] dt[j];
  delete[] dt;

  // convert weights to geoda::GalElement
  geoda::GalElement *gal = NULL;
  bool has_weights_values = weights_values.size() == m_obs;

  if (weights.size() > 0) {
    gal = new geoda::GalElement[valid_obs];
    yidx = 0;
    for (int i = 0; i < m_obs; i++) {
      if (undefs[i]) continue;
      // check how many valid observations in weights[i]
      int valid_nbrs = 0;
      for (int j = 0; j < weights[i].size(); j++) {
        if (!undefs[weights[i][j]]) {
          valid_nbrs++;
        }
      }
      gal[yidx].SetSizeNbrs(valid_nbrs);
      for (int j = 0; j < weights[i].size(); j++) {
        if (undefs[weights[i][j]]) continue;
        int nbr_id = orig_valid_map[weights[i][j]];
        if (has_weights_values) {
          gal[yidx].SetNbr(j, nbr_id, weights_values[i][j]);
        } else {
          gal[yidx].SetNbr(j, nbr_id);
        }
      }
      yidx++;
    }
  }

  // run linear regression
  const int n = valid_obs;
  bool do_white_test = false;

  bool include_constant = true;
  DiagnosticReport m_DR(n, x_names.size(), m_constant_term, include_constant, regress_model);
  // SetXVariableNames(&m_DR);
  for (int i = 0; i < x_names.size(); i++) {
    m_DR.SetXVarNames(i, x_names[i]);
  }
  m_DR.SetMeanY(ComputeMean(y, n));
  m_DR.SetSDevY(ComputeSdev(y, n));

  if (regress_model == geoda::RegressionModel::OLS) {
    bool calculate_moran = true;
    geoda::classicalRegression(gal, valid_obs, y, n, x, nX, &m_DR, m_constant_term, calculate_moran, do_white_test);
  } else if (regress_model == geoda::RegressionModel::SPATIAL_LAG) {
    geoda::spatialLagRegression(gal, valid_obs, y, n, x, nX, &m_DR, m_constant_term);
  } else if (regress_model == geoda::RegressionModel::SPATIAL_ERROR) {
    geoda::spatialErrorRegression(gal, valid_obs, y, n, x, nX, &m_DR, m_constant_term);
  } else {
    // run classic regression model
    bool calculate_moran = false;
    geoda::classicalRegression(gal, valid_obs, y, n, x, nX, &m_DR, m_constant_term, calculate_moran, do_white_test);
  }

  // free memory of gal
  delete[] gal;

  // free memory of x[] and y[]
  for (int i = 0; i < nVarName; i++) delete[] x[i];
  delete[] x;
  delete[] y;

  // return the result
  return m_DR;
}
