

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_COUNT_TEST, POSITIVE_TEST) {
  // clockwise
  std::vector<double> xs{0, 0, 1, 1, 0, 1, 1, 2, 2, 1};
  std::vector<double> ys{0, 1, 1, 0, 0, 0, 1, 1, 0, 0};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 0.2, 1.4};
  std::vector<double> ys1{0.4, 0.2, 0.4};
  std::vector<unsigned int> parts1{0, 1, 2};
  std::vector<unsigned int> sizes1{1, 1, 1};

  PointCollection pts(xs1, ys1, parts1, sizes1);

  std::vector<unsigned int> result = spatial_count(polys, pts);

  EXPECT_THAT(result, ElementsAre(2, 1));
}

TEST(SPATIAL_COUNT_TEST, NEGATIVE_TEST) {
  // polygon with holes
  std::vector<double> xs{0, 0, 1, 1, 0, 1, 1, 3, 3, 1, 1, 2, 2, 1, 1};
  std::vector<double> ys{0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 0};
  std::vector<unsigned int> parts{0, 5, 10};
  std::vector<unsigned int> holes{0, 0, 1};
  std::vector<unsigned int> sizes{1, 2};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  std::vector<double> xs1{0.4, 0.2, 1.4};
  std::vector<double> ys1{0.4, 0.2, 0.4};
  std::vector<unsigned int> parts1{0, 1, 2};
  std::vector<unsigned int> sizes1{1, 1, 1};

  PointCollection pts(xs1, ys1, parts1, sizes1);

  std::vector<unsigned int> result = spatial_count(polys, pts);

  EXPECT_THAT(result, ElementsAre(2, 0));
}
}  // namespace
