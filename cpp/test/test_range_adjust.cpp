#include <gtest/gtest.h>

#include <cmath>
#include <stdexcept>
#include <vector>

#include "../src/utils/range_adjust.h"

class RangeAdjustTest : public ::testing::Test {
 protected:
  void SetUp() override {}
  void TearDown() override {}

  // Helper function to compare vectors with tolerance for floating point
  void expectVectorEqual(const std::vector<double>& actual, const std::vector<double>& expected,
                         double tolerance = 1e-10) {
    ASSERT_EQ(actual.size(), expected.size());
    for (size_t i = 0; i < actual.size(); ++i) {
      EXPECT_NEAR(actual[i], expected[i], tolerance) << "Vectors differ at index " << i;
    }
  }
};

TEST_F(RangeAdjustTest, BasicRangeAdjustment) {
  std::vector<double> data = {1.0, 2.0, 3.0, 4.0, 5.0};
  std::vector<bool> undef = {false, false, false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.25, 0.5, 0.75, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, WithSomeUndefinedValues) {
  std::vector<double> data = {1.0, 999.0, 3.0, 888.0, 5.0};
  std::vector<bool> undef = {false, true, false, true, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 999.0, 0.5, 888.0, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, AllValuesTheSame) {
  std::vector<double> data = {3.14, 3.14, 3.14, 3.14};
  std::vector<bool> undef = {false, false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.0, 0.0, 0.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, SingleValidValue) {
  std::vector<double> data = {42.0};
  std::vector<bool> undef = {false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, SingleValidValueWithUndefined) {
  std::vector<double> data = {999.0, 42.0, 888.0};
  std::vector<bool> undef = {true, false, true};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {999.0, 0.0, 888.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, NegativeValues) {
  std::vector<double> data = {-5.0, -2.0, 1.0, 3.0};
  std::vector<bool> undef = {false, false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.375, 0.75, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, FloatingPointPrecision) {
  std::vector<double> data = {0.1, 0.2, 0.3};
  std::vector<bool> undef = {false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.5, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, LargeValues) {
  std::vector<double> data = {1e6, 2e6, 3e6};
  std::vector<bool> undef = {false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.5, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, VerySmallValues) {
  std::vector<double> data = {1e-10, 2e-10, 3e-10};
  std::vector<bool> undef = {false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.5, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, EmptyVectors) {
  std::vector<double> data;
  std::vector<bool> undef;

  // Should not throw and do nothing
  EXPECT_NO_THROW(geoda::range_adjust(data, undef));
  EXPECT_TRUE(data.empty());
}

TEST_F(RangeAdjustTest, AllValuesUndefined) {
  std::vector<double> data = {1.0, 2.0, 3.0};
  std::vector<bool> undef = {true, true, true};

  EXPECT_THROW(geoda::range_adjust(data, undef), std::runtime_error);
}

TEST_F(RangeAdjustTest, MismatchedVectorSizes) {
  std::vector<double> data = {1.0, 2.0, 3.0};
  std::vector<bool> undef = {false, false};  // Size mismatch

  EXPECT_THROW(geoda::range_adjust(data, undef), std::invalid_argument);
}

TEST_F(RangeAdjustTest, ZeroAndPositiveValues) {
  std::vector<double> data = {0.0, 5.0, 10.0};
  std::vector<bool> undef = {false, false, false};

  geoda::range_adjust(data, undef);

  std::vector<double> expected = {0.0, 0.5, 1.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, IdenticalMinMax) {
  std::vector<double> data = {7.5, 999.0, 7.5, 888.0, 7.5};
  std::vector<bool> undef = {false, true, false, true, false};

  geoda::range_adjust(data, undef);

  // All valid values are the same, should become 0.0
  std::vector<double> expected = {0.0, 999.0, 0.0, 888.0, 0.0};
  expectVectorEqual(data, expected);
}

TEST_F(RangeAdjustTest, ExtremePrecisionTest) {
  // Test with values that are very close but not identical
  std::vector<double> data = {1.0000000000001, 1.0000000000002, 1.0000000000003};
  std::vector<bool> undef = {false, false, false};

  geoda::range_adjust(data, undef);

  // Should still normalize correctly
  // Note: Due to the extremely small range (2e-13), floating point precision
  // errors are significant, so we use a more lenient tolerance
  std::vector<double> expected = {0.0, 0.5, 1.0};
  expectVectorEqual(data, expected, 1e-3);
}

TEST_F(RangeAdjustTest, MixedUndefinedPattern) {
  std::vector<double> data = {10.0, 999.0, 20.0, 888.0, 15.0, 777.0, 25.0};
  std::vector<bool> undef = {false, true, false, true, false, true, false};

  geoda::range_adjust(data, undef);

  // Valid values: 10, 20, 15, 25 -> range 10 to 25
  std::vector<double> expected = {0.0, 999.0, 2.0 / 3.0, 888.0, 1.0 / 3.0, 777.0, 1.0};
  expectVectorEqual(data, expected);
}
