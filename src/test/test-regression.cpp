#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>
#include <iostream>


#include "regression/regression.h"
#include "test/data.h"

TEST(REGRESSION, TEST_REGRESSION) {
  const std::vector<double> x = {1, 2, 3};
  const std::vector<double> y = {4, 5, 6};
  double r = geoda::dot_product(x, y);
  EXPECT_FLOAT_EQ(r, 32.0);
}

TEST(REGRESSION, LINEAR_REGRESSION) {
    const std::vector<double> dep = {1, 2, 3};
    const std::vector<std::vector<double>> indeps = {{1, 2, 3}, {1, 2, 3}};
    const std::vector<std::vector<unsigned int>> weights = {{1, 2}, {0, 2}, {0, 1}};
    const std::string y_name = "y";
    const std::vector<std::string> x_names = {"x1", "x2"};
    const std::string dataset_name = "test";
    const std::vector<bool> y_undefs = {false, false, false};
    const std::vector<std::vector<bool>> x_undefs = {{false, false, false}, {false, false, false}};
    std::string result = geoda::linear_regression(dep, indeps, weights, y_name, x_names, dataset_name, y_undefs, x_undefs);

    // parse the result using boost::property_tree into a json object
    boost::property_tree::ptree pt;
    std::istringstream is(result);
    boost::property_tree::read_json(is, pt);

    // check the result
    // type should be "linearRegression"
    EXPECT_EQ(pt.get<std::string>("type"), "linearRegression");
    // datasetName should be "test"
    EXPECT_EQ(pt.get<std::string>("datasetName"), "test");
    // dependentVariable should be "y"
    EXPECT_EQ(pt.get<std::string>("dependentVariable"), "y");
    // independentVariables should be an array of ['CONSTANT", "x1", "x2"]
    boost::property_tree::ptree indepVars = pt.get_child("independentVariables");
    // iterate through the value of indepVars
    int i = 0;
    for (auto& var : indepVars) {
        if (i == 0) {
            EXPECT_EQ(var.second.get_value<std::string>(), "CONSTANT");
        } else {
            EXPECT_EQ(var.second.get_value<std::string>(), x_names[i - 1]);
        }
        i++;
    }

    // title should be "SUMMARY OF OUTPUT: ORDINARY LEAST SQUARES ESTIMATION"
    EXPECT_EQ(pt.get<std::string>("title"), "SUMMARY OF OUTPUT: ORDINARY LEAST SQUARES ESTIMATION");
    // "number of observations" should be 3
    EXPECT_EQ(pt.get<int>("number of observations"), 3);
    // "Mean dependent var" should be 2.0
    EXPECT_FLOAT_EQ(pt.get<double>("Mean dependent var"), 2.0);
    // "Number of Variables" should be 2
    EXPECT_EQ(pt.get<int>("Number of Variables"), 2);
    // "SD_dependent_var" should be 0.81649661
    EXPECT_FLOAT_EQ(pt.get<double>("SD_dependent_var"), 0.81649661);
}