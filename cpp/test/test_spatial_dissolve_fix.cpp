// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <gtest/gtest.h>

#include <iostream>
#include <vector>

#include "geometry/polygon.h"
#include "geometry/spatial-dissolve.h"

TEST(SpatialDissolveTest, TestDissolveTracking) {
  // Test data - 5 rectangles as described in the user's test case
  std::vector<double> x_coords = {// Polygon 0: (0,0) to (1,1)
                                  0, 1, 1, 0, 0,
                                  // Polygon 1: (1,0) to (2,1)
                                  1, 2, 2, 1, 1,
                                  // Polygon 2: (5,5) to (6,6)
                                  5, 5, 6, 6, 5,
                                  // Polygon 3: (6,5) to (7,6)
                                  6, 6, 7, 7, 6,
                                  // Polygon 4: (2,0) to (3,1)
                                  2, 3, 3, 2, 2};

  std::vector<double> y_coords = {// Polygon 0: (0,0) to (1,1)
                                  0, 0, 1, 1, 0,
                                  // Polygon 1: (1,0) to (2,1)
                                  0, 0, 1, 1, 0,
                                  // Polygon 2: (5,5) to (6,6)
                                  5, 6, 6, 5, 5,
                                  // Polygon 3: (6,5) to (7,6)
                                  5, 6, 6, 5, 5,
                                  // Polygon 4: (2,0) to (3,1)
                                  0, 0, 1, 1, 0};

  std::vector<unsigned int> parts = {0, 5, 10, 15, 20};  // Starting indices for each polygon
  std::vector<unsigned int> holes = {0, 0, 0, 0, 0};     // No holes
  std::vector<unsigned int> sizes = {1, 1, 1, 1, 1};     // One part per polygon

  // Create PolygonCollection
  geoda::PolygonCollection polys(x_coords, y_coords, parts, holes, sizes);

  std::cout << "Testing spatial dissolve with 5 rectangles:" << std::endl;
  std::cout << "Polygon 0: (0,0)-(1,1)" << std::endl;
  std::cout << "Polygon 1: (1,0)-(2,1)" << std::endl;
  std::cout << "Polygon 2: (5,5)-(6,6)" << std::endl;
  std::cout << "Polygon 3: (6,5)-(7,6)" << std::endl;
  std::cout << "Polygon 4: (2,0)-(3,1)" << std::endl;
  std::cout << std::endl;

  std::cout << "Expected groups:" << std::endl;
  std::cout << "Group 1: [0, 1, 4] (adjacent horizontal rectangles)" << std::endl;
  std::cout << "Group 2: [2, 3] (adjacent rectangles)" << std::endl;
  std::cout << std::endl;

  // Test the original function
  std::vector<std::vector<int>> dissolved_groups;
  geoda::Polygon result = geoda::spatial_dissolve(polys, dissolved_groups);

  std::cout << "Actual groups returned:" << std::endl;
  for (size_t i = 0; i < dissolved_groups.size(); ++i) {
    std::cout << "Group " << i << ": [";
    for (size_t j = 0; j < dissolved_groups[i].size(); ++j) {
      std::cout << dissolved_groups[i][j];
      if (j < dissolved_groups[i].size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
  }

  // Test the new function with tracking
  std::cout << std::endl << "Testing new function with tracking:" << std::endl;
  geoda::DissolveResult new_result = geoda::spatial_dissolve_with_tracking(polys);

  std::cout << "New function groups:" << std::endl;
  for (size_t i = 0; i < new_result.dissolved_groups.size(); ++i) {
    std::cout << "Group " << i << ": [";
    for (size_t j = 0; j < new_result.dissolved_groups[i].size(); ++j) {
      std::cout << new_result.dissolved_groups[i][j];
      if (j < new_result.dissolved_groups[i].size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
  }

  // Check if we have the correct number of groups (should be 2, not 5)
  EXPECT_LT(dissolved_groups.size(), 5) << "Expected fewer than 5 groups, but got all polygons separate";
  EXPECT_LT(new_result.dissolved_groups.size(), 5) << "Expected fewer than 5 groups, but got all polygons separate";
}