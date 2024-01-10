

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_POLYS_POINTS) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 1, 3, 4};
  std::vector<unsigned int> sizes1{1, 2, 1, 1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, points, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 2);
  EXPECT_THAT(result[0], ElementsAre(1));
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_POLYS_LINES) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 1.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.4, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, lines, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 2);
  EXPECT_THAT(result[0], ElementsAre(0));
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_POLYS_POLYS) {
  // if the Geometries share space, are of the same dimension,
  // but are not completely contained by each other.
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{1, 1, 2, 2, 1, 6, 8, 8, 6, 6};
  std::vector<double> ys1{1, 2, 2, 1, 1, 6, 6, 8, 8, 6};
  std::vector<unsigned int> parts1{0, 5};
  std::vector<unsigned int> holes1{0, 0};
  std::vector<unsigned int> sizes1{1, 1};

  PolygonCollection polys1(xs1, ys1, parts1, holes1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(polys, polys1, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 2);
  // polygon NOT CROSSES any polygon
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_LINES_POINTS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, points, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 2);
  // lines CROSSES points should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_LINES_LINES) {
  std::vector<double> xs1{0.0, 1.0, 0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.0, 0.0, 0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2, 4};
  std::vector<unsigned int> sizes1{2, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{-1.0, 0.5, 4.0, 0.0};
  std::vector<double> ys2{0.0, 0.0, 0.0, 4.0};
  std::vector<unsigned int> parts2{0, 2};
  std::vector<unsigned int> sizes2{1, 1};

  LineCollection lines2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, lines2, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 2);
  // first line NOT CROSSES 1st line
  EXPECT_TRUE(result[0].empty());
  // second line CROSSES 2nd line
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_LINES_POLYGONS) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(lines, polys, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 2);
  EXPECT_TRUE(result[0].empty());
  // second line CROSSES 2nd polygon
  EXPECT_THAT(result[1], ElementsAre(1));
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_POINTS_POINTS) {
  std::vector<double> xs1{1.4, 0.2, 2.4, 21.0, 15.4};
  std::vector<double> ys1{1.4, 0.2, 1.4, 21.0, 15.4};
  std::vector<unsigned int> parts1{0, 2, 3, 4};
  std::vector<unsigned int> sizes1{2, 1, 1, 1};

  PointCollection points1(xs1, ys1, parts1, sizes1);

  std::vector<double> xs2{0.4, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys2{0.4, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts2{0, 2, 3, 4};
  std::vector<unsigned int> sizes2{2, 1, 1, 1};

  PointCollection points2(xs2, ys2, parts2, sizes2);

  std::vector<std::vector<unsigned int>> result = spatial_join(points1, points2, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 4);
  // no other points CROSSES with
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_POINTS_LINES) {
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

  std::vector<std::vector<unsigned int>> result = spatial_join(points, lines, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 5);
  // points CROSSES lines should always return false
  EXPECT_TRUE(result[0].empty());
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
  EXPECT_TRUE(result[4].empty());
}

TEST(SPATIAL_JOIN_TEST_CROSSES, CROSSES_POINTS_POLYGON) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{-1.0, 0.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{-1.0, 0.2, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2, 3, 4};
  std::vector<unsigned int> sizes1{2, 1, 1, 1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<unsigned int>> result = spatial_join(points, polys, SpatialJoinType::CROSSES);

  EXPECT_EQ(result.size(), 4);
  EXPECT_THAT(result[0], ElementsAre(0));
  EXPECT_TRUE(result[1].empty());
  EXPECT_TRUE(result[2].empty());
  EXPECT_TRUE(result[3].empty());
}
}  // namespace
