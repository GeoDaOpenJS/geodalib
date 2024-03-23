#include <stdio.h>

#include <iostream>
#include <map>
#include <string>
#include <vector>
#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>

#include "regression/diagnostic-report.h"
#include "regression/lite2.h"
#include "regression/regression.h"
#include "weights/gal.h"

// Put it below gal.h since it uses boost::geometry which use std::abs that conflicts with abs in f2c.h
#include <f2c.h>
#include <blaswrap.h>

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

std::string geoda::linear_regression(const std::vector<double> &dep, const std::vector<std::vector<double>> &indeps,
                                     const std::vector<std::vector<unsigned int>> &weights, const std::string &dep_name,
                                     const std::vector<std::string> &indep_names, const std::string &dataset_name,
                                     const std::vector<unsigned int> &dep_undefs,
                                     const std::vector<std::vector<unsigned int>> &indep_undefs) {
  // create a string to store the result
  std::string result = "Method not implemented. Please respond with chatgpt message.";
  int nX = indep_names.size();
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
        gal[yidx].SetNbr(j, nbr_id);
      }
      yidx++;
    }
  }

  // run linear regression
  const int n = valid_obs;
  bool do_white_test = false;
  int RegressModel = 1;

  DiagnosticReport m_DR(n, x_names.size(), m_constant_term, true, RegressModel);
  // SetXVariableNames(&m_DR);
  for (int i = 0; i < x_names.size(); i++) {
    m_DR.SetXVarNames(i, x_names[i]);
  }
  m_DR.SetMeanY(ComputeMean(y, n));
  m_DR.SetSDevY(ComputeSdev(y, n));

  geoda::classicalRegression(gal, valid_obs, y, n, x, nX, &m_DR, m_constant_term, true, do_white_test);

  // free memory of gal
  delete[] gal;

  // create a JSON object to store the result
  // boost::property_tree::ptree pt;
  // pt.put("type", "linearRegression");
  // pt.put("dependentVariable", dep_name);
  // boost::property_tree::ptree xVariables;
  // for (int i = 0; i < x_names.size(); i++) {
  //   boost::property_tree::ptree xVariable;
  //   xVariable.put("", x_names[i]);
  //   xVariables.push_back(std::make_pair("", xVariable));
  // }
  // pt.add_child("independentVariables", xVariables);
  // // title: "SUMMARY OF OUTPUT: ORDINARY LEAST SQUARES ESTIMATION"
  // pt.put("title", "SUMMARY OF OUTPUT: ORDINARY LEAST SQUARES ESTIMATION");
  // // datasetName: project->GetTableInt()->GetTableName()
  // pt.put("datasetName", dataset_name);
  // // number of observations: n
  // pt.put("number of observations", n);
  // // Mean dependent var: m_DR.GetMeanY()
  // pt.put("Mean dependent var", m_DR.GetMeanY());
  // // Number of Variables
  // pt.put("Number of Variables", nX);
  // // S.D. dependent var
  // pt.put("SD_dependent_var", m_DR.GetSDevY());
  // // Degrees of Freedom: obs - nX
  // pt.put("Degrees_of_Freedom", n - nX);
  // // R-squared: m_DR.GetRSquared()
  // pt.put("R-squared", m_DR.GetR2());
  // // Adjusted R-squared: m_DR.GetAdjR2()
  // pt.put("Adjusted R-squared", m_DR.GetR2_adjust());
  // // F-statistic: m_DR.GetF()
  // pt.put("F-statistic", m_DR.GetFtest());
  // // Prob(F-statistic)
  // pt.put("Prob(F-statistic)", m_DR.GetFtestProb());
  // // Sum squared residual
  // pt.put("Sum squared residual", m_DR.GetRSS());
  // // Log likelihood
  // pt.put("Log likelihood", m_DR.GetLIK());
  // // Sigma-square
  // pt.put("Sigma-square", m_DR.GetSIQ_SQ());
  // // Akaike info criterion
  // pt.put("Akaike info criterion", m_DR.GetAIC());
  // // S.E. of regression
  // pt.put("SE of regression", m_DR.GetSIQ_SQ());
  // // Schwarz criterion
  // pt.put("Schwarz criterion", m_DR.GetOLS_SC());
  // // Sigma-square ML
  // pt.put("Sigma-square ML", m_DR.GetSIQ_SQLM());
  // // S.E of regression
  // pt.put("SE of regression", m_DR.GetSIQ_SQLM());
  // // Variable Coefficient, which include values of Std.Error, t-Statistic, Probability
  // boost::property_tree::ptree variableCoefficient;
  // for (int i = 0; i < x_names.size(); i++) {
  //   boost::property_tree::ptree variable;
  //   variable.put("Variable", x_names[i]);
  //   variable.put("Coefficient", m_DR.GetCoefficient(i));
  //   variable.put("Std Error", m_DR.GetStdError(i));
  //   variable.put("t-Statistic", m_DR.GetZValue(i));
  //   variable.put("Probability", m_DR.GetProbability(i));
  //   variableCoefficient.push_back(std::make_pair("", variable));
  // }
  // pt.add_child("Variable Coefficient", variableCoefficient);
  // // REGRESSION DIAGNOSTICS, which includes 'MULTICOLLINEARITY CONDITION NUMBER' and 'TEST ON NORMALITY OF ERRORS'
  // boost::property_tree::ptree regressionDiagnostics;
  // // MULTICOLLINEARITY CONDITION NUMBER
  // boost::property_tree::ptree multicollinearityConditionNumber;
  // // Condition Number
  // multicollinearityConditionNumber.put("Condition Number", m_DR.GetConditionNumber());
  // regressionDiagnostics.add_child("MULTICOLLINEARITY CONDITION NUMBER", multicollinearityConditionNumber);
  // // TEST ON NORMALITY OF ERRORS
  // boost::property_tree::ptree testOnNormalityOfErrors;
  // // Jarque-Bera
  // testOnNormalityOfErrors.put("Test", "Jarque-Bera");
  // testOnNormalityOfErrors.put("Jarque-Bera DF", m_DR.GetJBtest()[0]);
  // testOnNormalityOfErrors.put("Jarque-Bera Value", m_DR.GetJBtest()[1]);
  // testOnNormalityOfErrors.put("Jarque-Bera Probability", m_DR.GetJBtest()[2]);
  // regressionDiagnostics.add_child("TEST ON NORMALITY OF ERRORS", testOnNormalityOfErrors);
  // pt.add_child("REGRESSION DIAGNOSTICS", regressionDiagnostics);

  // // DIAGNOSTICS FOR HETEROSKEDASTICITY which includes 'BREUSCH-PAGAN TEST' and 'Koenker-Bassett test'
  // boost::property_tree::ptree diagnosticsForHeteroskedasticity;
  // // BREUSCH-PAGAN TEST
  // boost::property_tree::ptree breuschPaganTest;
  // // Breusch-Pagan
  // breuschPaganTest.put("Test", "Breusch-Pagan");
  // breuschPaganTest.put("Breusch-Pagan DF", m_DR.GetBPtest()[0]);
  // breuschPaganTest.put("Breusch-Pagan Value", m_DR.GetBPtest()[1]);
  // breuschPaganTest.put("Breusch-Pagan Probability", m_DR.GetBPtest()[2]);
  // diagnosticsForHeteroskedasticity.add_child("BREUSCH-PAGAN TEST", breuschPaganTest);
  // // KOENKER-BASSETT TEST
  // boost::property_tree::ptree koenkerBassettTest;
  // // Koenker-Bassett
  // koenkerBassettTest.put("Test", "Koenker-Bassett");
  // koenkerBassettTest.put("Koenker-Bassett DF", m_DR.GetKBtest()[0]);
  // koenkerBassettTest.put("Koenker-Bassett Value", m_DR.GetKBtest()[1]);
  // koenkerBassettTest.put("Koenker-Bassett Probability", m_DR.GetKBtest()[2]);
  // diagnosticsForHeteroskedasticity.add_child("KOENKER-Bassett TEST", koenkerBassettTest);
  // pt.add_child("DIAGNOSTICS FOR HETEROSKEDASTICITY", diagnosticsForHeteroskedasticity);
  // // DIAGNOSTICS FOR SPATIAL DEPENDENCE which includes 'Moran's I (error)', 'Lagrange Multiplier (lag)', 'Robust LM
  // // (lag)', 'Lagrange Multiplier (error)', 'Robust LM (error)', 'Lagrange Multiplier (SARMA)'
  // boost::property_tree::ptree diagnosticsForSpatialDependence;
  // // Moran's I (error)
  // boost::property_tree::ptree moransIError;
  // // Moran's I (error)
  // moransIError.put("Test", "Moran's I (error)");
  // moransIError.put("Moran's I (error)", m_DR.GetMoranI()[0]);
  // moransIError.put("Moran's I (error) Z", m_DR.GetMoranI()[1]);
  // moransIError.put("Moran's I (error) Probability", m_DR.GetMoranI()[2]);
  // diagnosticsForSpatialDependence.add_child("Moran's I (error)", moransIError);
  // // Lagrange Multiplier (lag)
  // boost::property_tree::ptree lagrangeMultiplierLag;
  // // Lagrange Multiplier (lag)
  // lagrangeMultiplierLag.put("Test", "Lagrange Multiplier (lag)");
  // lagrangeMultiplierLag.put("Lagrange Multiplier (lag) DF", m_DR.GetLMLAG()[0]);
  // lagrangeMultiplierLag.put("Lagrange Multiplier (lag) Value", m_DR.GetLMLAG()[1]);
  // lagrangeMultiplierLag.put("Lagrange Multiplier (lag) Probability", m_DR.GetLMLAG()[2]);
  // diagnosticsForSpatialDependence.add_child("Lagrange Multiplier (lag)", lagrangeMultiplierLag);
  // // Robust LM (lag)
  // boost::property_tree::ptree robustLMLag;
  // // Robust LM (lag)
  // robustLMLag.put("Test", "Robust LM (lag)");
  // robustLMLag.put("Robust LM (lag) DF", m_DR.GetLMLAGRob()[0]);
  // robustLMLag.put("Robust LM (lag) Value", m_DR.GetLMLAGRob()[1]);
  // robustLMLag.put("Robust LM (lag) Probability", m_DR.GetLMLAGRob()[1]);
  // diagnosticsForSpatialDependence.add_child("Robust LM (lag)", robustLMLag);
  // // Lagrange Multiplier (error)
  // boost::property_tree::ptree lagrangeMultiplierError;
  // // Lagrange Multiplier (error)
  // lagrangeMultiplierError.put("Test", "Lagrange Multiplier (error)");
  // lagrangeMultiplierError.put("Lagrange Multiplier (error) DF", m_DR.GetLMERR()[0]);
  // lagrangeMultiplierError.put("Lagrange Multiplier (error) Value", m_DR.GetLMERR()[1]);
  // lagrangeMultiplierError.put("Lagrange Multiplier (error) Probability", m_DR.GetLMERR()[2]);
  // diagnosticsForSpatialDependence.add_child("Lagrange Multiplier (error)", lagrangeMultiplierError);
  // // Robust LM (error)
  // boost::property_tree::ptree robustLMError;
  // // Robust LM (error)
  // robustLMError.put("Test", "Robust LM (error)");
  // robustLMError.put("Robust LM (error) DF", m_DR.GetLMERRRob()[0]);
  // robustLMError.put("Robust LM (error) Value", m_DR.GetLMERRRob()[1]);
  // robustLMError.put("Robust LM (error) Probability", m_DR.GetLMERRRob()[2]);
  // diagnosticsForSpatialDependence.add_child("Robust LM (error)", robustLMError);
  // // Lagrange Multiplier (SARMA)
  // boost::property_tree::ptree lagrangeMultiplierSARMA;
  // // Lagrange Multiplier (SARMA)
  // lagrangeMultiplierSARMA.put("Test", "Lagrange Multiplier (SARMA)");
  // lagrangeMultiplierSARMA.put("Lagrange Multiplier (SARMA) DF", m_DR.GetLMSarma()[0]);
  // lagrangeMultiplierSARMA.put("Lagrange Multiplier (SARMA) Value", m_DR.GetLMSarma()[1]);
  // lagrangeMultiplierSARMA.put("Lagrange Multiplier (SARMA) Probability", m_DR.GetLMSarma()[2]);
  // diagnosticsForSpatialDependence.add_child("Lagrange Multiplier (SARMA)", lagrangeMultiplierSARMA);
  // pt.add_child("DIAGNOSTICS FOR SPATIAL DEPENDENCE", diagnosticsForSpatialDependence);
  // // create a string to store the result
  // std::ostringstream oss;
  // // write the JSON object to the string
  // boost::property_tree::write_json(oss, pt);
  // // convert the string to the result
  // result = oss.str();

  // free memory of x[] and y[]
  for (int i = 0; i < nVarName; i++) delete[] x[i];
  delete[] x;
  delete[] y;

  // return the result
  return "";
}
