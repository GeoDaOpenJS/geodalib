

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_POLYS_POINTS) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, points, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 2);
  // first polygon intersects with 1st, 2nd points
  EXPECT_THAT(result[0], ElementsAre(0, 1));
  // second polygon intersects with 4th points
  EXPECT_THAT(result[1], ElementsAre(4));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_POLYS_LINES) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, lines, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 2);
  // first polygon intersects with 1st line
  EXPECT_THAT(result[0], ElementsAre(0));
  // second polygon intersects with 2nd line
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_POLYS_POLYS) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{1, 1, 2, 2, 1, 6, 7, 7, 6, 6};
  std::vector<double> ys1{1, 2, 2, 1, 1, 6, 6, 7, 7, 6};
  std::vector<unsigned int> parts1{0, 5};
  std::vector<unsigned int> holes1{0, 0};
  std::vector<unsigned int> sizes1{1, 1};

  PolygonCollection polys1(xs1, ys1, parts1, holes1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, polys1, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 2);
  // first polygon intersects with 1st polygon
  EXPECT_THAT(result[0], ElementsAre(0));
  // second polygon intersects with 2nd polygon
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_LINES_POINTS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, points, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 2);
  // first line intersects with 1st, 2nd points
  EXPECT_THAT(result[0], ElementsAre(0, 1));
  // second line intersects with 3rd, 4th, 5th points
  EXPECT_THAT(result[1], ElementsAre(2, 3, 4));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_LINES_LINES) {
  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{1.0, 2.0, 4.0, 0.0};
  std::vector<double> ys2{1.0, 2.0, 0.0, 4.0};
  std::vector<unsigned int> parts2{0, 2};
  std::vector<unsigned int> sizes2{1, 1};

  LineCollection lines2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, lines2, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 2);
  // first line intersects with no line
  EXPECT_EQ(result[0].size(), 0);
  // second line intersects with 2nd line
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_LINES_POLYGONS) {
  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, polys, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 2);
  // first line intersects with 1st polygon
  EXPECT_THAT(result[0], ElementsAre(0));
  // second line intersects with 2nd polygon
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_POINTS_POINTS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(points1, points2, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 5);
  // 2nd point intersects with 2nd point
  EXPECT_THAT(result[1], ElementsAre(1));
  // no other points intersect with
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_POINTS_LINES) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(points, lines, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 5);
  // first point intersects with 1st line
  EXPECT_THAT(result[0], ElementsAre(0));
  // 2nd point intersects with 1st line
  EXPECT_THAT(result[1], ElementsAre(0));
  // 3rd, 4th, 5th points intersect wit 2nd line
  EXPECT_THAT(result[2], ElementsAre(1));
  EXPECT_THAT(result[3], ElementsAre(1));
  EXPECT_THAT(result[4], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_INTERSECTS, INTERSECTS_POINTS_POLYGON) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 1, 2, 3, 4};
  std::vector<unsigned int> sizes1{1, 1, 1, 1, 1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(points, polys, SpatialJoinType::INTERSECTS);

  EXPECT_EQ(result.size(), 5);
  EXPECT_THAT(result[0], ElementsAre(0));
  EXPECT_THAT(result[1], ElementsAre(0));
  EXPECT_EQ(result[2].size(), 0);
  EXPECT_EQ(result[3].size(), 0);
  EXPECT_THAT(result[4], ElementsAre(1));
}
}  // namespace
