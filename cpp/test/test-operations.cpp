

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

#define EXPECT_FLOATS_NEARLY_EQ(expected, actual, thresh) \
        EXPECT_EQ(expected.size(), actual.size()) << "Array sizes differ.";\
        for (size_t idx = 0; idx < std::min(expected.size(), actual.size()); ++idx) \
        { \
            EXPECT_NEAR(expected[idx], actual[idx], thresh) << "at index: " << idx;\
        }

namespace {

TEST(SPATIAL_OPERATIONS_TEST, TEST_CENTROIDS_EMPTY_POINTS) {
  std::vector<double> xs;
  std::vector<double> ys;
  std::vector<unsigned int> parts{0};
  std::vector<unsigned int> sizes{0};

  LineCollection empty_point(xs, ys, parts, sizes);

  std::vector<std::vector<double>> empty_centroid = get_centroids(empty_point);
  EXPECT_TRUE(empty_centroid[0].empty());

  std::vector<double> xs1{0.4, 1.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.0, 0.0, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 0, 1, 1, 3};
  std::vector<unsigned int> sizes1{0, 1, 0, 2, 2};

  PointCollection points(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<double>> centroids = get_centroids(points);

  EXPECT_EQ(centroids.size(), 5);
  EXPECT_TRUE(centroids[0].empty());
  EXPECT_THAT(centroids[1], ElementsAre(0.4, 0));
  EXPECT_TRUE(centroids[2].empty());
  EXPECT_FLOATS_NEARLY_EQ(centroids[3], std::vector<double>({1.3, 0.2}), 0.0001);
  EXPECT_THAT(centroids[4], ElementsAre(8.2, 8.2));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_CENTROIDS_EMPTY_LINES) {
  std::vector<double> xs;
  std::vector<double> ys;
  std::vector<unsigned int> parts{0};
  std::vector<unsigned int> sizes{0};

  LineCollection empty_line(xs, ys, parts, sizes);

  std::vector<std::vector<double>> empty_centroid = get_centroids(empty_line);
  EXPECT_TRUE(empty_centroid[0].empty());

  std::vector<double> xs1{0.4, 1.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.0, 0.0, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 0, 2};
  std::vector<unsigned int> sizes1{0, 1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  std::vector<std::vector<double>> centroids = get_centroids(lines);

  EXPECT_EQ(centroids.size(), 3);
  EXPECT_TRUE(centroids[0].empty());
  EXPECT_THAT(centroids[1], ElementsAre(0.8, 0));
  EXPECT_THAT(centroids[2], ElementsAre(6.9128142318569195, 6.5910177898211488));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_CENTROIDS_EMPTY_POLYGON) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 0, 5, 5, 10};
  std::vector<unsigned int> holes{0, 0, 0, 0, 0};
  std::vector<unsigned int> sizes{0, 1, 0, 1, 0};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<std::vector<double>> centroids = get_centroids(polys);

  EXPECT_EQ(centroids.size(), 5);
  EXPECT_TRUE(centroids[0].empty());
  EXPECT_THAT(centroids[1], ElementsAre(0.5, 0.5));
  EXPECT_TRUE(centroids[2].empty());
  EXPECT_THAT(centroids[3], ElementsAre(6, 6));
  EXPECT_TRUE(centroids[4].empty());
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_CENTROIDS) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<std::vector<double>> centroids = get_centroids(polys);

  EXPECT_EQ(centroids.size(), 2);
  EXPECT_THAT(centroids[0], ElementsAre(0.5, 0.5));
  EXPECT_THAT(centroids[1], ElementsAre(6, 6));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_POINTS) {
  Point point1;
  point1.add(0.4, 0.4);

  Point point2;
  point2.add(0.2, 0.2);

  Point point3;
  point3.add(1.4, 0.4);

  std::vector<Geometry*> points;
  points.push_back(&point1);
  points.push_back(&point2);
  points.push_back(&point3);

  EXPECT_EQ(points.size(), 3);
}
}  // namespace
