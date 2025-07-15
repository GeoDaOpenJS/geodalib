// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <gtest/gtest.h>

#include <cmath>
#include <limits>
#include <vector>

#include "geometry/thiessen-polygon.h"

class ThiessenPolygonTest : public ::testing::Test {
 protected:
  void SetUp() override {}
  void TearDown() override {}

  // Helper function to calculate the area of a polygon using the shoelace formula
  double calculatePolygonArea(const std::vector<double>& x, const std::vector<double>& y) {
    if (x.size() < 3 || x.size() != y.size()) return 0.0;

    double area = 0.0;
    size_t n = x.size();
    for (size_t i = 0; i < n; ++i) {
      size_t j = (i + 1) % n;
      area += x[i] * y[j] - x[j] * y[i];
    }
    return std::abs(area) / 2.0;
  }

  // Helper function to check if a polygon is closed
  bool isPolygonClosed(const std::vector<double>& x, const std::vector<double>& y) {
    if (x.empty() || y.empty()) return false;
    return std::abs(x.front() - x.back()) < 1e-10 && std::abs(y.front() - y.back()) < 1e-10;
  }

  // Helper function to check if a point is inside a polygon using ray casting
  // Also returns true if the point is on the polygon boundary (vertices or edges)
  bool isPointInPolygon(double px, double py, const std::vector<double>& x, const std::vector<double>& y) {
    if (x.size() < 3) return false;

    const double epsilon = 1e-10;
    size_t n = x.size();

    // Check if point is exactly on any vertex
    for (size_t i = 0; i < n; ++i) {
      if (std::abs(x[i] - px) < epsilon && std::abs(y[i] - py) < epsilon) {
        return true;
      }
    }

    // Check if point lies on any edge
    for (size_t i = 0, j = n - 1; i < n; j = i++) {
      // Check if point is on the line segment between vertices i and j
      double dx1 = x[j] - x[i];
      double dy1 = y[j] - y[i];
      double dx2 = px - x[i];
      double dy2 = py - y[i];

      // Cross product to check if point is on the line
      double cross = dx1 * dy2 - dy1 * dx2;
      if (std::abs(cross) < epsilon) {
        // Point is on the line, check if it's within the segment
        double dot = dx1 * dx2 + dy1 * dy2;
        double len_sq = dx1 * dx1 + dy1 * dy1;
        if (dot >= -epsilon && dot <= len_sq + epsilon) {
          return true;
        }
      }
    }

    // Use ray casting algorithm for interior points
    bool inside = false;
    for (size_t i = 0, j = n - 1; i < n; j = i++) {
      if (((y[i] > py) != (y[j] > py)) && (px < (x[j] - x[i]) * (py - y[i]) / (y[j] - y[i]) + x[i])) {
        inside = !inside;
      }
    }
    return inside;
  }
};

// Test case 1: Empty input
TEST_F(ThiessenPolygonTest, EmptyInput) {
  std::vector<double> empty_x, empty_y;
  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(empty_x, empty_y);
  EXPECT_TRUE(result.empty());
}

// Test case 2: Single point
TEST_F(ThiessenPolygonTest, SinglePoint) {
  std::vector<double> x = {0.0};
  std::vector<double> y = {0.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 1);

  // Single point should create a polygon that covers the entire bounded area
  EXPECT_FALSE(result[0].get_x().empty());
  EXPECT_FALSE(result[0].get_y().empty());
  EXPECT_TRUE(isPointInPolygon(x[0], y[0], result[0].get_x(), result[0].get_y()));
}

// Test case 3: Two points
TEST_F(ThiessenPolygonTest, TwoPoints) {
  std::vector<double> x = {0.0, 2.0};
  std::vector<double> y = {0.0, 0.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 2);

  // Both polygons should be valid and closed
  for (const auto& poly : result) {
    EXPECT_FALSE(poly.get_x().empty());
    EXPECT_FALSE(poly.get_y().empty());
    EXPECT_TRUE(isPolygonClosed(poly.get_x(), poly.get_y()));
    EXPECT_GT(calculatePolygonArea(poly.get_x(), poly.get_y()), 0.0);
  }

  // The first point should be inside the first polygon
  EXPECT_TRUE(isPointInPolygon(0.0, 0.0, result[0].get_x(), result[0].get_y()));
  // The second point should be inside the second polygon
  EXPECT_TRUE(isPointInPolygon(2.0, 0.0, result[1].get_x(), result[1].get_y()));
}

// Test case 4: Three points forming a triangle
TEST_F(ThiessenPolygonTest, ThreePointsTriangle) {
  std::vector<double> x = {0.0, 1.0, 0.5};
  std::vector<double> y = {0.0, 0.0, 1.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 3);

  // All polygons should be valid
  for (size_t i = 0; i < result.size(); ++i) {
    EXPECT_FALSE(result[i].get_x().empty());
    EXPECT_FALSE(result[i].get_y().empty());
    EXPECT_TRUE(isPolygonClosed(result[i].get_x(), result[i].get_y()));
    EXPECT_GT(calculatePolygonArea(result[i].get_x(), result[i].get_y()), 0.0);

    // Each original point should be inside its corresponding polygon
    EXPECT_TRUE(isPointInPolygon(x[i], y[i], result[i].get_x(), result[i].get_y()));
  }
}

// Test case 5: Four points forming a square
TEST_F(ThiessenPolygonTest, FourPointsSquare) {
  std::vector<double> x = {0.0, 2.0, 2.0, 0.0};
  std::vector<double> y = {0.0, 0.0, 2.0, 2.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 4);

  // All polygons should be valid
  for (size_t i = 0; i < result.size(); ++i) {
    EXPECT_FALSE(result[i].get_x().empty());
    EXPECT_FALSE(result[i].get_y().empty());
    EXPECT_TRUE(isPolygonClosed(result[i].get_x(), result[i].get_y()));
    EXPECT_GT(calculatePolygonArea(result[i].get_x(), result[i].get_y()), 0.0);

    // Each original point should be inside its corresponding polygon
    EXPECT_TRUE(isPointInPolygon(x[i], y[i], result[i].get_x(), result[i].get_y()));
  }
}

// Test case 6: Points on a line (degenerate case)
TEST_F(ThiessenPolygonTest, PointsOnLine) {
  std::vector<double> x = {0.0, 1.0, 2.0, 3.0};
  std::vector<double> y = {0.0, 0.0, 0.0, 0.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 4);

  // Even for degenerate cases, polygons should be created
  for (const auto& poly : result) {
    EXPECT_FALSE(poly.get_x().empty());
    EXPECT_FALSE(poly.get_y().empty());
    EXPECT_TRUE(isPolygonClosed(poly.get_x(), poly.get_y()));
  }
}

// Test case 7: Random points
TEST_F(ThiessenPolygonTest, RandomPoints) {
  std::vector<double> x = {1.2, 3.4, 5.6, 2.1, 4.3, 0.8, 6.7};
  std::vector<double> y = {2.3, 1.5, 4.8, 6.2, 3.9, 5.1, 0.7};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 7);

  // All polygons should be valid
  for (size_t i = 0; i < result.size(); ++i) {
    EXPECT_FALSE(result[i].get_x().empty());
    EXPECT_FALSE(result[i].get_y().empty());
    EXPECT_TRUE(isPolygonClosed(result[i].get_x(), result[i].get_y()));
    EXPECT_GT(calculatePolygonArea(result[i].get_x(), result[i].get_y()), 0.0);

    // Each original point should be inside its corresponding polygon
    EXPECT_TRUE(isPointInPolygon(x[i], y[i], result[i].get_x(), result[i].get_y()));
  }
}

// Test case 8: Mismatched input sizes
TEST_F(ThiessenPolygonTest, MismatchedInputSizes) {
  std::vector<double> x = {0.0, 1.0, 2.0};
  std::vector<double> y = {0.0, 1.0};  // Different size

  // The function should return empty result for mismatched sizes
  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_TRUE(result.empty());
}

// Test case 9: Large coordinate values
TEST_F(ThiessenPolygonTest, LargeCoordinateValues) {
  std::vector<double> x = {1000000.0, 1000001.0, 1000002.0};
  std::vector<double> y = {2000000.0, 2000001.0, 2000002.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 3);

  // All polygons should be valid even with large coordinates
  for (size_t i = 0; i < result.size(); ++i) {
    EXPECT_FALSE(result[i].get_x().empty());
    EXPECT_FALSE(result[i].get_y().empty());
    EXPECT_TRUE(isPolygonClosed(result[i].get_x(), result[i].get_y()));
    EXPECT_GT(calculatePolygonArea(result[i].get_x(), result[i].get_y()), 0.0);
  }
}

// Test case 10: Negative coordinates
TEST_F(ThiessenPolygonTest, NegativeCoordinates) {
  std::vector<double> x = {-2.0, -1.0, 0.0, 1.0, 2.0};
  std::vector<double> y = {-2.0, -1.0, 0.0, 1.0, 2.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 5);

  // All polygons should be valid with negative coordinates
  for (size_t i = 0; i < result.size(); ++i) {
    EXPECT_FALSE(result[i].get_x().empty());
    EXPECT_FALSE(result[i].get_y().empty());
    EXPECT_TRUE(isPolygonClosed(result[i].get_x(), result[i].get_y()));
    EXPECT_GT(calculatePolygonArea(result[i].get_x(), result[i].get_y()), 0.0);

    // Each original point should be inside its corresponding polygon
    EXPECT_TRUE(isPointInPolygon(x[i], y[i], result[i].get_x(), result[i].get_y()));
  }
}

// Test case 11: Duplicate points (should be handled gracefully)
TEST_F(ThiessenPolygonTest, DuplicatePoints) {
  std::vector<double> x = {0.0, 0.0, 1.0, 1.0, 2.0};
  std::vector<double> y = {0.0, 0.0, 1.0, 1.0, 2.0};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 5);

  // Should handle duplicate points without crashing
  for (const auto& poly : result) {
    EXPECT_FALSE(poly.get_x().empty());
    EXPECT_FALSE(poly.get_y().empty());
    EXPECT_TRUE(isPolygonClosed(poly.get_x(), poly.get_y()));
  }
}

// Test case 12: Very close points (precision test)
TEST_F(ThiessenPolygonTest, VeryClosePoints) {
  std::vector<double> x = {0.0, 0.0001, 0.0002, 0.0003};
  std::vector<double> y = {0.0, 0.0001, 0.0002, 0.0003};

  std::vector<geoda::Polygon> result = geoda::thiessen_polygon(x, y);
  EXPECT_EQ(result.size(), 4);

  // Should handle very close points
  for (const auto& poly : result) {
    EXPECT_FALSE(poly.get_x().empty());
    EXPECT_FALSE(poly.get_y().empty());
    EXPECT_TRUE(isPolygonClosed(poly.get_x(), poly.get_y()));
  }
}

int main(int argc, char** argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}