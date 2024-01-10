

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./statistics/local-statistics.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_STATISTICS_TEST, TEST_STANDARDIZE_DATA) {
  const std::vector<double> data{1, 2, 3, 4, 5, 6, 7};
  std::vector<double> std_data = standardize_data(data);

  EXPECT_THAT(std_data, ElementsAre(-1.3887301496588271, -0.92582009977255141, -0.46291004988627571, 0,
                                    0.46291004988627571, 0.92582009977255141, 1.3887301496588271));

  const std::vector<double> data1;
  std::vector<double> std_data1 = standardize_data(data1);

  EXPECT_TRUE(std_data1.empty());

  const std::vector<double> data2{1};
  std::vector<double> std_data2 = standardize_data(data2);

  EXPECT_THAT(std_data2, ElementsAre(1));
}

TEST(SPATIAL_STATISTICS_TEST, TEST_PERM_TABLE) {
  const std::vector<std::vector<unsigned int>> neighbors = {{1, 2}, {0, 3}, {4, 5}, {5, 2}, {0, 1}, {4}};
  std::vector<std::vector<unsigned int>> perm_table = create_perm_table(neighbors, 9, 2);

  EXPECT_EQ(perm_table.size(), 9);
  EXPECT_THAT(perm_table[0], ElementsAre(0, 2));
  EXPECT_THAT(perm_table[1], ElementsAre(3, 4));
  EXPECT_THAT(perm_table[2], ElementsAre(2, 3));
  EXPECT_THAT(perm_table[3], ElementsAre(3, 4));
  EXPECT_THAT(perm_table[4], ElementsAre(1, 0));
  EXPECT_THAT(perm_table[5], ElementsAre(1, 0));
  EXPECT_THAT(perm_table[6], ElementsAre(4, 0));
  EXPECT_THAT(perm_table[7], ElementsAre(4, 0));
  EXPECT_THAT(perm_table[8], ElementsAre(1, 0));
}

TEST(SPATIAL_STATISTICS_TEST, TEST_LOCAL_MORAN) {
  const std::vector<std::vector<unsigned int>> neighbors = {{1}, {0}, {}, {4, 5}, {3, 5}, {3, 4}};
  const std::vector<double> data = {3.0, 3.0, 0.0, 9.0, 8.0, 8.5};
  LisaResult result = local_moran(data, neighbors, 99);

  EXPECT_TRUE(result.is_valid);

  EXPECT_THAT(result.p_values, ElementsAre(0.16, 0.16, 0, 0.09, 0.09, 0.09));
  EXPECT_THAT(result.cluster_values, ElementsAre(2, 2, 5, 1, 1, 1));
  EXPECT_THAT(result.lag_values, ElementsAre(-0.60187542319380571, -0.60187542319380571, 0, 0.80250056425840766,
                                             0.93625065830147558, 0.86937561127994156));
  EXPECT_THAT(result.lisa_values, ElementsAre(0.36225402504472271, 0.36225402504472271, 0, 0.80500894454382832,
                                              0.68872987477638636, 0.7558139534883721));
}
}  // namespace
