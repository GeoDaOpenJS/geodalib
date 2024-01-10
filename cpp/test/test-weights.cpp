

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./weights/distance-weights.h"
#include "./weights/nearest-neighbors.h"

using namespace testing;
using namespace geoda;

namespace {
TEST(SPATIAL_WEIGHTS_TEST, K_NEAREST_NEIGHBORS) {
  std::vector<double> xs;
  std::vector<double> ys;
  std::vector<unsigned int> parts;
  std::vector<unsigned int> sizes;
  PointCollection points(xs, ys, parts, sizes);

  std::vector<std::vector<unsigned int>> empty_nbrs = knearest_neighbors(points, 2);

  EXPECT_EQ(empty_nbrs.size(), 0);

  std::vector<double> xs1{1.4, 0.2, 2.4, 21.0, 15.4};
  std::vector<double> ys1{1.4, 0.2, 1.4, 21.0, 15.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points1(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> nbrs = knearest_neighbors(points1, 2);

  EXPECT_EQ(nbrs.size(), 5);

  EXPECT_THAT(nbrs[0], ElementsAre(1, 2));
  EXPECT_THAT(nbrs[1], ElementsAre(2, 0));
  EXPECT_THAT(nbrs[2], ElementsAre(1, 0));
  EXPECT_THAT(nbrs[3], ElementsAre(2, 4));
  EXPECT_THAT(nbrs[4], ElementsAre(2, 3));
}

TEST(SPATIAL_WEIGHTS_TEST, HAVERSINE_DISTANCE) {
  // 1 degree is about 111.2 kilometers
  double d1 = haversine_distance(0, 0, 1, 0, false);
  EXPECT_THAT(d1, 111.19505197522943);

  // 1 degree is about 69 miles
  double d2 = haversine_distance(0, 0, 1, 0, true);
  EXPECT_THAT(d2, 69.093402016740626);
}

TEST(SPATIAL_WEIGHTS_TEST, GET_DIST_THRESHOLDS) {
  std::vector<double> xs;
  std::vector<double> ys;
  std::vector<unsigned int> parts;
  std::vector<unsigned int> sizes;
  PointCollection points(xs, ys, parts, sizes);

  bool is_mile = false;
  std::vector<double> dist_thresholds = get_distance_thresholds(points, is_mile);

  EXPECT_THAT(dist_thresholds, ElementsAre(0, 0, 0));

  std::vector<double> xs1{0.0, 0.0};
  std::vector<double> ys1{0.0, 1.0};
  std::vector<unsigned int> parts1{0, 1};
  std::vector<unsigned int> sizes1{1, 1};

  PointCollection points1(xs1, ys1, parts1, sizes1);

  std::vector<double> dist_thresholds2 = get_distance_thresholds(points1, is_mile);

  EXPECT_THAT(dist_thresholds2, ElementsAre(111.19505197522943, 111.19505197522943, 111.19505197522943));

  is_mile = true;
  std::vector<double> xs2{0.0, 1.0, 2.0};
  std::vector<double> ys2{0.0, 0.0, 2.0};
  std::vector<unsigned int> parts2{0, 1, 2};
  std::vector<unsigned int> sizes2{1, 1, 1};

  PointCollection points2(xs2, ys2, parts2, sizes2);
  std::vector<double> dist_thresholds3 = get_distance_thresholds(points2, is_mile);

  EXPECT_THAT(dist_thresholds3, ElementsAre(69.093402016740626, 154.49126792241307, 195.40580482080586));
}

TEST(SPATIAL_WEIGHTS_TEST, DISTANCE_WEIGHTS) {
  std::vector<double> xs;
  std::vector<double> ys;
  std::vector<unsigned int> parts;
  std::vector<unsigned int> sizes;
  PointCollection points(xs, ys, parts, sizes);

  bool is_mile = true;
  std::vector<std::vector<unsigned int>> empty_nbrs = distance_weights(points, 0, is_mile);

  EXPECT_EQ(empty_nbrs.size(), 0);

  std::vector<double> xs1{1.4, 0.2, 2.4, 21.0, 15.4};
  std::vector<double> ys1{1.4, 0.2, 1.4, 21.0, 15.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points1(xs1, ys1, parts1, sizes1);

  std::vector<double> dist_thresholds = get_distance_thresholds(points1, is_mile);
  std::vector<std::vector<unsigned int>> nbrs = distance_weights(points1, dist_thresholds[0], is_mile);

  EXPECT_EQ(nbrs.size(), 5);

  EXPECT_THAT(nbrs[0], ElementsAre(2));
  EXPECT_THAT(nbrs[1], ElementsAre());
  EXPECT_THAT(nbrs[2], ElementsAre(0));
  EXPECT_THAT(nbrs[3], ElementsAre());
  EXPECT_THAT(nbrs[4], ElementsAre());
}
}  // namespace
