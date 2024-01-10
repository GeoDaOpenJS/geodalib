

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_POLYS_POINTS) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, points, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 2);
  // polygon EQUALS points should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_POLYS_LINES) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 1.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.0, 0.0, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, lines, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 2);
  // polygon EQUALS lines should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_POLYS_POLYS) {
  // if the Geometries share space, are of the same dimension,
  // but are not completely contained by each other.
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{1, 1, 0, 0, 1, 5, 7, 7, 5, 5};
  std::vector<double> ys1{1, 0, 0, 1, 1, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts1{0, 5};
  std::vector<unsigned int> holes1{0, 0};
  std::vector<unsigned int> sizes1{1, 1};

  PolygonCollection polys1(xs1, ys1, parts1, holes1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, polys1, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 2);
  // first polygon EQUALS 1st polygon
  EXPECT_THAT(result[0], ElementsAre(0));
  // second polygon EQUALS 2nd polygon
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_LINES_POINTS) {
  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys2{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts2{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes2{1, 1, 1, 1, 1};

  PointCollection points(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, points, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 2);
  // lines EQUALS points should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_LINES_LINES) {
  std::vector<double> xs1{0.0, 1.0, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.0, 0.0, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.0, 1.0, 5.4, 11.0, 1.4};
  std::vector<double> ys2{0.0, 0.0, 5.4, 11.0, 0.4};
  std::vector<unsigned int> parts2{0, 2};
  std::vector<unsigned int> sizes2{1, 1};

  LineCollection lines2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, lines2, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 2);
  // first line EQUALS 1st line
  EXPECT_THAT(result[0], ElementsAre(0));
  // second line EQUALS 2nd line
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_LINES_POLYGONS) {
  std::vector<double> xs1{0.2, 0.4, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.2, 0.4, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, polys, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 2);
  // lines EQUALS polygons should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_POINTS_POINTS) {
  std::vector<double> xs1{1.4, 0.2, 2.4, 21.0, 15.4};
  std::vector<double> ys1{1.4, 0.2, 1.4, 21.0, 15.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points1(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys2{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts2{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes2{1, 1, 1, 1, 1};

  PointCollection points2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(points1, points2, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 5);
  // second point EQUALS 2nd point
  EXPECT_THAT(result[1], ElementsAre(1));
  // no other points intersect with
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_MULTIPOINTS_MULTIPOINTS) {
  std::vector<double> xs1{0.2, 0.4, 2.4, 21.0, 15.4};
  std::vector<double> ys1{0.2, 0.4, 1.4, 21.0, 15.4};
  std::vector<unsigned int> parts1{0, 2, 3, 4};
  std::vector<unsigned int> sizes1{2, 1, 1, 1};

  PointCollection points1(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys2{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts2{0, 2, 3, 4};
  std::vector<unsigned int> sizes2{2, 1, 1, 1};

  PointCollection points2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(points1, points2, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 4);
  EXPECT_THAT(result[0], ElementsAre(0));
  // no other points intersect with
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_POINTS_LINES) {
  //  checks if the first geometry is completely inside the second geometry.
  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys2{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts2{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes2{1, 1, 1, 1, 1};

  PointCollection points(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(points, lines, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 5);
  // points EQUALS lines should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}

TEST(SPATIAL_JOIN_TEST_EQUALS, EQUALS_POINTS_POLYGON) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.0, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(points, polys, SpatialJoinType::EQUALS);

  EXPECT_EQ(result.size(), 5);
  // points EQUALS polygons should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}
}  // namespace
