#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include <cmath>
#include <stdexcept>
#include <vector>

#include "utils/mad.h"

using namespace testing;

class MADTest : public ::testing::Test {
 protected:
  // Helper function to check if two doubles are approximately equal
  bool IsApproxEqual(double a, double b, double tolerance = 1e-10) { return std::abs(a - b) < tolerance; }

  // Helper function to check if all elements in vector are approximately equal to expected
  bool VectorApproxEqual(const std::vector<double>& actual, const std::vector<double>& expected,
                         const std::vector<bool>& undef, double tolerance = 1e-10) {
    if (actual.size() != expected.size()) return false;
    for (size_t i = 0; i < actual.size(); ++i) {
      if (!undef[i] && !IsApproxEqual(actual[i], expected[i], tolerance)) {
        return false;
      }
    }
    return true;
  }
};

TEST_F(MADTest, NormalCase) {
  // Test data: [1, 2, 3, 4, 5] -> mean = 3, MAD = 1.2
  // Expected standardized: [(1-3)/1.2, (2-3)/1.2, (3-3)/1.2, (4-3)/1.2, (5-3)/1.2]
  //                       = [-1.667, -0.833, 0, 0.833, 1.667]
  std::vector<double> data = {1.0, 2.0, 3.0, 4.0, 5.0};
  std::vector<bool> undef = {false, false, false, false, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_TRUE(result);
  std::vector<double> expected = {-5.0 / 3.0, -5.0 / 6.0, 0.0, 5.0 / 6.0, 5.0 / 3.0};
  EXPECT_TRUE(VectorApproxEqual(data, expected, undef));
}

TEST_F(MADTest, WithUndefinedValues) {
  // Test data: [1, undef, 3, undef, 5] -> valid values: [1, 3, 5]
  // Mean = 3, MAD = 4/3
  std::vector<double> data = {1.0, 999.0, 3.0, 888.0, 5.0};  // undef values can be anything
  std::vector<bool> undef = {false, true, false, true, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_TRUE(result);
  // Only check defined values
  EXPECT_TRUE(IsApproxEqual(data[0], -1.5));  // (1-3)/(4/3) = -1.5
  EXPECT_TRUE(IsApproxEqual(data[2], 0.0));   // (3-3)/(4/3) = 0
  EXPECT_TRUE(IsApproxEqual(data[4], 1.5));   // (5-3)/(4/3) = 1.5
  // Undefined values should be unchanged
  EXPECT_EQ(data[1], 999.0);
  EXPECT_EQ(data[3], 888.0);
}

TEST_F(MADTest, EmptyVector) {
  std::vector<double> data;
  std::vector<bool> undef;

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_FALSE(result);
}

TEST_F(MADTest, AllValuesUndefined) {
  std::vector<double> data = {1.0, 2.0, 3.0};
  std::vector<bool> undef = {true, true, true};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_FALSE(result);
  // Data should remain unchanged
  EXPECT_EQ(data[0], 1.0);
  EXPECT_EQ(data[1], 2.0);
  EXPECT_EQ(data[2], 3.0);
}

TEST_F(MADTest, ZeroMAD_AllValuesSame) {
  // All valid values are the same -> MAD = 0
  std::vector<double> data = {5.0, 5.0, 5.0, 5.0};
  std::vector<bool> undef = {false, false, false, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_FALSE(result);
  // Data should remain unchanged
  EXPECT_EQ(data[0], 5.0);
  EXPECT_EQ(data[1], 5.0);
  EXPECT_EQ(data[2], 5.0);
  EXPECT_EQ(data[3], 5.0);
}

TEST_F(MADTest, ZeroMAD_WithUndefinedValues) {
  // Valid values are all the same, with some undefined values
  std::vector<double> data = {7.0, 999.0, 7.0, 888.0, 7.0};
  std::vector<bool> undef = {false, true, false, true, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_FALSE(result);
  // Data should remain unchanged
  EXPECT_EQ(data[0], 7.0);
  EXPECT_EQ(data[1], 999.0);
  EXPECT_EQ(data[2], 7.0);
  EXPECT_EQ(data[3], 888.0);
  EXPECT_EQ(data[4], 7.0);
}

TEST_F(MADTest, SingleValidValue) {
  std::vector<double> data = {42.0};
  std::vector<bool> undef = {false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_FALSE(result);      // MAD = 0 for single value
  EXPECT_EQ(data[0], 42.0);  // Should remain unchanged
}

TEST_F(MADTest, SingleValidValueWithUndefined) {
  std::vector<double> data = {999.0, 42.0, 888.0};
  std::vector<bool> undef = {true, false, true};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_FALSE(result);       // MAD = 0 for single valid value
  EXPECT_EQ(data[0], 999.0);  // Undefined values unchanged
  EXPECT_EQ(data[1], 42.0);   // Valid value unchanged
  EXPECT_EQ(data[2], 888.0);  // Undefined values unchanged
}

TEST_F(MADTest, MismatchedVectorSizes) {
  std::vector<double> data = {1.0, 2.0, 3.0};
  std::vector<bool> undef = {false, false};  // Different size

  EXPECT_THROW(geoda::standardize_mad(data, undef), std::invalid_argument);
}

TEST_F(MADTest, NegativeValues) {
  std::vector<double> data = {-5.0, -1.0, 2.0, 8.0};
  std::vector<bool> undef = {false, false, false, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_TRUE(result);
  // Mean = 1, MAD = 4, expected: [(-5-1)/4, (-1-1)/4, (2-1)/4, (8-1)/4] = [-1.5, -0.5, 0.25, 1.75]
  std::vector<double> expected = {-1.5, -0.5, 0.25, 1.75};
  EXPECT_TRUE(VectorApproxEqual(data, expected, undef));
}

TEST_F(MADTest, LargeValues) {
  std::vector<double> data = {1000.0, 2000.0, 3000.0};
  std::vector<bool> undef = {false, false, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_TRUE(result);
  // Mean = 2000, MAD = 2000/3, expected: [-1.5, 0, 1.5]
  std::vector<double> expected = {-1.5, 0.0, 1.5};
  EXPECT_TRUE(VectorApproxEqual(data, expected, undef));
}

TEST_F(MADTest, FloatingPointPrecision) {
  std::vector<double> data = {1.1, 2.2, 3.3, 4.4, 5.5};
  std::vector<bool> undef = {false, false, false, false, false};

  bool result = geoda::standardize_mad(data, undef);

  EXPECT_TRUE(result);
  // Mean = 3.3, MAD = 1.32
  // Verify the transformation maintains precision
  double mean = 3.3;
  double mad = 1.32;
  for (size_t i = 0; i < data.size(); ++i) {
    double original = 1.1 * (i + 1);
    double expected = (original - mean) / mad;
    EXPECT_TRUE(IsApproxEqual(data[i], expected, 1e-10));
  }
}