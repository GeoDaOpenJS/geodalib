

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_UNION_TEST, CLOCKWISE_TEST) {
  // clockwise
  std::vector<double> xs{0, 0, 1, 1, 0, 1, 1, 2, 2, 1, 3, 3, 4, 4, 3, 3, 3, 3.5, 3.5, 3, 5, 5, 7, 7, 5, 6, 6, 8, 8, 6};
  std::vector<double> ys{0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0.5, 0.5, 0, 0, 5, 7, 7, 5, 5, 6, 8, 8, 6, 6};
  std::vector<unsigned int> parts{0, 5, 10, 15, 20, 25};
  std::vector<unsigned int> holes{0, 0, 0, 0, 0, 0};
  std::vector<unsigned int> sizes{1, 1, 1, 1, 1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  Polygon result = spatial_union(polys);
  EXPECT_EQ(result.size(), 3);
  EXPECT_THAT(result.get_x(), ElementsAre(2, 2, 1, 0, 0, 2, 3, 4, 4, 3, 3, 6, 6, 8, 8, 7, 7, 5, 5, 6));
  EXPECT_THAT(result.get_y(), ElementsAre(1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 7, 8, 8, 6, 6, 5, 5, 7, 7));
  EXPECT_THAT(result.get_parts(), ElementsAre(0, 6, 11));
  EXPECT_THAT(result.get_holes(), ElementsAre(0, 0, 0));
}
}  // namespace
