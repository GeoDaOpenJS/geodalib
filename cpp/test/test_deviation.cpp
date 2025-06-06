#include <gtest/gtest.h>

#include <cmath>
#include <limits>
#include <vector>

#include "../src/utils/deviation.h"

class DeviationTest : public ::testing::Test {
 protected:
  void SetUp() override {}
  void TearDown() override {}

  // Helper function to compare vectors with tolerance
  void expectVectorsNearEqual(const std::vector<double>& expected, const std::vector<double>& actual,
                              double tolerance = 1e-9) {
    ASSERT_EQ(expected.size(), actual.size());
    for (size_t i = 0; i < expected.size(); ++i) {
      if (std::isnan(expected[i])) {
        EXPECT_TRUE(std::isnan(actual[i])) << "Expected NaN at index " << i << ", got " << actual[i];
      } else if (std::isinf(expected[i])) {
        EXPECT_TRUE(std::isinf(actual[i]) && std::signbit(expected[i]) == std::signbit(actual[i]))
            << "Expected " << expected[i] << " at index " << i << ", got " << actual[i];
      } else {
        EXPECT_NEAR(expected[i], actual[i], tolerance) << "At index " << i;
      }
    }
  }
};

// Test basic functionality
TEST_F(DeviationTest, BasicFunctionality) {
  std::vector<double> data = {1.0, 2.0, 3.0, 4.0, 5.0};
  std::vector<bool> undef = {false, false, false, false, false};

  geoda::deviation_from_mean(data, undef);

  // Mean is 3.0, so deviations should be {-2, -1, 0, 1, 2}
  std::vector<double> expected = {-2.0, -1.0, 0.0, 1.0, 2.0};
  expectVectorsNearEqual(expected, data);
}

// Test with some undefined values
TEST_F(DeviationTest, WithUndefinedValues) {
  std::vector<double> data = {1.0, 2.0, 3.0, 4.0, 5.0};
  std::vector<bool> undef = {true, false, false, false, true};

  geoda::deviation_from_mean(data, undef);

  // Only values at indices 1, 2, 3 are used: mean = (2+3+4)/3 = 3.0
  // Expected: {1.0, -1.0, 0.0, 1.0, 5.0} (undefined values unchanged)
  std::vector<double> expected = {1.0, -1.0, 0.0, 1.0, 5.0};
  expectVectorsNearEqual(expected, data);
}

// Test with all values undefined
TEST_F(DeviationTest, AllUndefined) {
  std::vector<double> data = {1.0, 2.0, 3.0};
  std::vector<bool> undef = {true, true, true};

  EXPECT_THROW(geoda::deviation_from_mean(data, undef), std::runtime_error);
}

// Test with empty vectors
TEST_F(DeviationTest, EmptyVectors) {
  std::vector<double> data;
  std::vector<bool> undef;

  EXPECT_NO_THROW(geoda::deviation_from_mean(data, undef));
  EXPECT_TRUE(data.empty());
}

// Test with mismatched vector sizes
TEST_F(DeviationTest, MismatchedSizes) {
  std::vector<double> data = {1.0, 2.0, 3.0};
  std::vector<bool> undef = {false, false};

  EXPECT_THROW(geoda::deviation_from_mean(data, undef), std::invalid_argument);
}

// Test with single element
TEST_F(DeviationTest, SingleElement) {
  std::vector<double> data = {5.0};
  std::vector<bool> undef = {false};

  geoda::deviation_from_mean(data, undef);

  // Single element should become 0 (deviation from itself)
  EXPECT_NEAR(0.0, data[0], 1e-9);
}

// Test with negative numbers
TEST_F(DeviationTest, NegativeNumbers) {
  std::vector<double> data = {-3.0, -1.0, 1.0, 3.0};
  std::vector<bool> undef = {false, false, false, false};

  geoda::deviation_from_mean(data, undef);

  // Mean is 0.0, so deviations should be {-3, -1, 1, 3}
  std::vector<double> expected = {-3.0, -1.0, 1.0, 3.0};
  expectVectorsNearEqual(expected, data);
}

// Test with floating point precision
TEST_F(DeviationTest, FloatingPointPrecision) {
  std::vector<double> data = {0.1, 0.2, 0.3};
  std::vector<bool> undef = {false, false, false};

  geoda::deviation_from_mean(data, undef);

  // Mean is 0.2, so deviations should be {-0.1, 0.0, 0.1}
  std::vector<double> expected = {-0.1, 0.0, 0.1};
  expectVectorsNearEqual(expected, data);
}

// Test with infinite values
TEST_F(DeviationTest, InfiniteValues) {
  std::vector<double> data = {1.0, std::numeric_limits<double>::infinity(), 3.0};
  std::vector<bool> undef = {false, false, false};

  geoda::deviation_from_mean(data, undef);

  // Infinite values should be ignored in mean calculation
  // Mean of 1.0 and 3.0 is 2.0
  std::vector<double> expected = {-1.0, std::numeric_limits<double>::infinity(), 1.0};
  expectVectorsNearEqual(expected, data);
}

// Test with NaN values
TEST_F(DeviationTest, NaNValues) {
  std::vector<double> data = {1.0, std::numeric_limits<double>::quiet_NaN(), 3.0};
  std::vector<bool> undef = {false, false, false};

  geoda::deviation_from_mean(data, undef);

  // NaN values should be ignored in mean calculation
  // Mean of 1.0 and 3.0 is 2.0
  std::vector<double> expected = {-1.0, std::numeric_limits<double>::quiet_NaN(), 1.0};
  expectVectorsNearEqual(expected, data);
}

// Test with large dataset
TEST_F(DeviationTest, LargeDataset) {
  const size_t size = 1000;
  std::vector<double> data(size);
  std::vector<bool> undef(size, false);

  // Fill with consecutive numbers
  for (size_t i = 0; i < size; ++i) {
    data[i] = static_cast<double>(i);
  }

  geoda::deviation_from_mean(data, undef);

  // Mean should be 499.5, first element should be -499.5, last should be 499.5
  EXPECT_NEAR(-499.5, data[0], 1e-9);
  EXPECT_NEAR(499.5, data[size - 1], 1e-9);

  // Sum of deviations should be approximately zero
  double sum = 0.0;
  for (double val : data) {
    sum += val;
  }
  EXPECT_NEAR(0.0, sum, 1e-6);
}

// Test with alternating undefined values
TEST_F(DeviationTest, AlternatingUndefined) {
  std::vector<double> data = {1.0, 100.0, 2.0, 200.0, 3.0, 300.0};
  std::vector<bool> undef = {false, true, false, true, false, true};

  geoda::deviation_from_mean(data, undef);

  // Only 1.0, 2.0, 3.0 are used: mean = 2.0
  // Expected: {-1.0, 100.0, 0.0, 200.0, 1.0, 300.0}
  std::vector<double> expected = {-1.0, 100.0, 0.0, 200.0, 1.0, 300.0};
  expectVectorsNearEqual(expected, data);
}