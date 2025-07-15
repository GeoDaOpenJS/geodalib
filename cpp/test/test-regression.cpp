// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include <iostream>
#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>

#include "regression/diagnostic-report.h"
#include "regression/regression.h"
#include "test/data.h"

TEST(REGRESSION, TEST_REGRESSION) {
  const std::vector<double> x = {1, 2, 3};
  const std::vector<double> y = {4, 5, 6};
  double r = geoda::dot_product(x, y);
  EXPECT_FLOAT_EQ(r, 32.0);
}

TEST(REGRESSION, OLS_REGRESSION) {
  const std::vector<double> dep = {1, 2, 3};
  const std::vector<std::vector<double>> indeps = {{1, 2, 3}, {1, 2, 3}};
  const std::vector<std::vector<unsigned int>> weights = {{1, 2}, {0, 2}, {0, 1}};
  const std::vector<std::vector<double>> weights_values;
  const std::string y_name = "y";
  const std::vector<std::string> x_names = {"x1", "x2"};
  const std::string dataset_name = "test";
  const std::vector<unsigned int> y_undefs;
  const std::vector<std::vector<unsigned int>> x_undefs;
  DiagnosticReport m_DR =
      geoda::ols(dep, indeps, weights, weights_values, y_name, x_names, dataset_name, y_undefs, x_undefs);

  // check the result
  // "number of observations" should be 3
  EXPECT_EQ(m_DR.GetNoObservation(), 3);
  // "Mean dependent var" should be 2.0
  EXPECT_FLOAT_EQ(m_DR.GetMeanY(), 2.0);
  // "SD_dependent_var" should be 0.81649661
  EXPECT_FLOAT_EQ(m_DR.GetSDevY(), 0.81649661);
}

TEST(REGRESSION, OLS_REGRESSION_NAT) {
  const std::vector<double> dep = TEST_DATA_Y;
  const std::vector<std::vector<double>> indeps = TEST_DATA_X;
  const std::vector<std::vector<unsigned int>> weights = TEST_DATA_WEIGHTS;
  const std::vector<std::vector<double>> weights_values = TEST_DATA_WEIGHTS_VALUES;
  const std::string y_name = "y";
  const std::vector<std::string> x_names = {"x1", "x2"};
  const std::string dataset_name = "test";
  const std::vector<unsigned int> y_undefs;
  const std::vector<std::vector<unsigned int>> x_undefs;
  DiagnosticReport m_DR =
      geoda::ols(dep, indeps, weights, weights_values, y_name, x_names, dataset_name, y_undefs, x_undefs);

  // check the result
  // type should be "linearRegression"
  EXPECT_EQ(m_DR.GetSDevY(), 5.6488060776177891);
}

TEST(REGRESSION, SPATIAL_LAG) {
  const std::vector<double> dep = TEST_DATA_Y;
  const std::vector<std::vector<double>> indeps = TEST_DATA_X;
  const std::vector<std::vector<unsigned int>> weights = TEST_DATA_WEIGHTS;
  const std::vector<std::vector<double>> weights_values = TEST_DATA_WEIGHTS_VALUES;
  const std::string y_name = "y";
  const std::vector<std::string> x_names = {"x1", "x2"};
  const std::string dataset_name = "test";
  const std::vector<unsigned int> y_undefs;
  const std::vector<std::vector<unsigned int>> x_undefs;
  DiagnosticReport m_DR =
      geoda::spatial_lag(dep, indeps, weights, weights_values, y_name, x_names, dataset_name, y_undefs, x_undefs);

  // check the result
  // type should be "spatialLag"
  EXPECT_EQ(m_DR.GetSDevY(), 5.6488060776177891);
}

TEST(REGRESSION, SPATIAL_ERROR) {
  const std::vector<double> dep = TEST_DATA_Y;
  const std::vector<std::vector<double>> indeps = TEST_DATA_X;
  const std::vector<std::vector<unsigned int>> weights = TEST_DATA_WEIGHTS;
  const std::vector<std::vector<double>> weights_values = TEST_DATA_WEIGHTS_VALUES;
  const std::string y_name = "y";
  const std::vector<std::string> x_names = {"x1", "x2"};
  const std::string dataset_name = "test";
  const std::vector<unsigned int> y_undefs;
  const std::vector<std::vector<unsigned int>> x_undefs;
  DiagnosticReport m_DR =
      geoda::spatial_error(dep, indeps, weights, weights_values, y_name, x_names, dataset_name, y_undefs, x_undefs);

  // check the result
  // type should be "spatialLag"
  EXPECT_EQ(m_DR.GetSDevY(), 5.6488060776177891);
}