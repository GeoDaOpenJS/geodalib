

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_POLYS_POINTS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, points, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 2);
  // first polygon TOUCHES with 1st points
  EXPECT_THAT(result[0], ElementsAre(0));
  // second polygon TOUCHES no points
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_POLYS_LINES) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, lines, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 2);
  // first polygon TOUCHES 1st line
  EXPECT_THAT(result[0], ElementsAre(0));
  // second polygon TOUCHES no line
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_POLYS_POLYS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, polys1, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 2);
  // first polygon TOUCHES 1st polygon
  EXPECT_THAT(result[0], ElementsAre(0));
  // second polygon TOUCHES no polygon
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_LINES_POINTS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, points, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 2);
  // first line TOUCHES 1st, 2nd points
  EXPECT_THAT(result[0], ElementsAre(0, 1));
  // second line TOUCHES 3rd, 5th points (NOTE: 4th point count as INTERSECTS not TOUCHES)
  EXPECT_THAT(result[1], ElementsAre(2, 4));
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_LINES_LINES) {
  std::vector<double> xs1{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.3, 0.3, 4.0, 0.0};
  std::vector<double> ys2{0.0, 0.3, 0.0, 4.0};
  std::vector<unsigned int> parts2{0, 2};
  std::vector<unsigned int> sizes2{1, 1};

  LineCollection lines2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, lines2, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 2);
  // first line TOUCHES with 1st line
  EXPECT_THAT(result[0], ElementsAre(0));
  // second line TOUCHES with no line
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_LINES_POLYGONS) {
  std::vector<double> xs1{0.2, 0.4, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.0, 0.0, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, polys, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 2);
  // first line TOUCHES 1st polygon
  EXPECT_THAT(result[0], ElementsAre(0));
  // second line TOUCHES no polygon
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_POINTS_POINTS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(points1, points2, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 5);
  // second point NO TOUCHES 2nd point NOTE: it counts as INTERSECTS or Overlapping
  EXPECT_TRUE(result[1].empty());
  // no other points intersect with
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_POINTS_LINES) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(points, lines, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 5);
  // first point TOUCHES 1st line
  EXPECT_THAT(result[0], ElementsAre(0));
  // 2nd point TOUCHES 1st line
  EXPECT_THAT(result[1], ElementsAre(0));
  // 3rd, 5th points TOUCHES 2nd line
  EXPECT_THAT(result[2], ElementsAre(1));
  EXPECT_THAT(result[4], ElementsAre(1));
  // 4th point INTERSECTS not TOUCHES 2nd line
  EXPECT_TRUE(result[3].empty());
}

TEST(SPATIAL_JOIN_TEST_TOUCHES, TOUCHES_POINTS_POLYGON) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(points, polys, SpatialJoinType::TOUCHES);

  EXPECT_EQ(result.size(), 5);
  EXPECT_THAT(result[0], ElementsAre(0));
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}
}  // namespace
