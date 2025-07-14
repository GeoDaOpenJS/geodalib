// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include <gtest/gtest.h>

#include "geometry/cartogram.h"
#include "weights/gal.h"

namespace geoda {
namespace test {

class CartogramTest : public ::testing::Test {
 protected:
  void SetUp() override {
    // Create a simple 3x3 grid of regions
    num_obs = 9;
    gal = new GalElement[num_obs];

    // Set up neighbors for each region
    // For simplicity, we'll connect each region to its adjacent regions
    for (int i = 0; i < num_obs; i++) {
      int row = i / 3;
      int col = i % 3;

      int nbr_count = 0;
      if (row > 0) nbr_count++;
      if (row < 2) nbr_count++;
      if (col > 0) nbr_count++;
      if (col < 2) nbr_count++;

      gal[i].SetSizeNbrs(nbr_count);

      int nbr_idx = 0;
      // Add neighbors (up, down, left, right)
      if (row > 0) gal[i].SetNbr(nbr_idx++, i - 3);  // up
      if (row < 2) gal[i].SetNbr(nbr_idx++, i + 3);  // down
      if (col > 0) gal[i].SetNbr(nbr_idx++, i - 1);  // left
      if (col < 2) gal[i].SetNbr(nbr_idx++, i + 1);  // right
    }

    // Create test data
    orig_x = std::vector<double>(num_obs);
    orig_y = std::vector<double>(num_obs);
    orig_data = std::vector<double>(num_obs);

    // Set up a grid of points
    for (int i = 0; i < num_obs; i++) {
      orig_x[i] = (i % 3) * 0.1;      // x coordinates: 0, 0.1, 0.2
      orig_y[i] = (i / 3) * 0.1;      // y coordinates: 0, 0.1, 0.2
      orig_data[i] = 100.0 + i * 10.0;  // varying population data
    }

    orig_data_min = 100.0;
    orig_data_max = 180.0;
  }

  void TearDown() override { delete[] gal; }

  GalElement* gal;
  int num_obs;
  std::vector<double> orig_x;
  std::vector<double> orig_y;
  std::vector<double> orig_data;
  double orig_data_min;
  double orig_data_max;
};

TEST_F(CartogramTest, ConstructorTest) {
  CartogramNeighbor* nbs = new CartogramNeighbor(gal, num_obs);
  Cartogram* cart = new Cartogram(nbs, orig_x, orig_y, orig_data, orig_data_min, orig_data_max);

  // Check if output vectors are properly initialized
  EXPECT_EQ(cart->output_x.size(), num_obs);
  EXPECT_EQ(cart->output_y.size(), num_obs);
  EXPECT_EQ(cart->output_radius.size(), num_obs);

  delete cart;
  delete nbs;
}

TEST_F(CartogramTest, NeighborTest) {
  CartogramNeighbor* nbs = new CartogramNeighbor(gal, num_obs);

  // Check if neighbors are properly set up
  // Center region (index 4) should have 4 neighbors
  EXPECT_EQ(nbs->nbours[5], 4);  // +1 because of 1-based indexing

  // Corner region (index 0) should have 2 neighbors
  EXPECT_EQ(nbs->nbours[1], 2);

  // Edge region (index 1) should have 3 neighbors
  EXPECT_EQ(nbs->nbours[2], 3);

  delete nbs;
}

TEST_F(CartogramTest, ImproveTest) {
  CartogramNeighbor* nbs = new CartogramNeighbor(gal, num_obs);
  Cartogram* cart = new Cartogram(nbs, orig_x, orig_y, orig_data, orig_data_min, orig_data_max);

  // Run improvement iterations
  int result = cart->improve(10);
  EXPECT_EQ(result, 0);

  // Check if positions have changed
  bool positions_changed = false;
  for (int i = 0; i < num_obs; i++) {
    if (std::abs(cart->output_x[i] - orig_x[i]) > 0.001 || std::abs(cart->output_y[i] - orig_y[i]) > 0.001) {
      positions_changed = true;
      break;
    }
  }
  EXPECT_TRUE(positions_changed);

  // Check if all radii are positive
  for (int i = 0; i < num_obs; i++) {
    EXPECT_GT(cart->output_radius[i], 0.0);
  }

  delete cart;
  delete nbs;
}

TEST_F(CartogramTest, DataScalingTest) {
  CartogramNeighbor* nbs = new CartogramNeighbor(gal, num_obs);

  // Test with negative data
  std::vector<double> neg_data = orig_data;
  for (int i = 0; i < num_obs; i++) {
    neg_data[i] -= 200.0;  // Make all values negative
  }

  Cartogram* cart = new Cartogram(nbs, orig_x, orig_y, neg_data, -100.0, -20.0);
  int result = cart->improve(5);
  EXPECT_EQ(result, 0);

  // Check if all radii are still positive
  for (int i = 0; i < num_obs; i++) {
    EXPECT_GT(cart->output_radius[i], 0.0);
  }

  delete cart;
  delete nbs;
}

TEST_F(CartogramTest, SingleValueTest) {
  CartogramNeighbor* nbs = new CartogramNeighbor(gal, num_obs);

  // Test with all same values
  std::vector<double> same_data(num_obs, 100.0);
  Cartogram* cart = new Cartogram(nbs, orig_x, orig_y, same_data, 100.0, 100.0);
  int result = cart->improve(5);
  EXPECT_EQ(result, 0);

  // Check if all radii are equal
  double first_radius = cart->output_radius[0];
  for (int i = 1; i < num_obs; i++) {
    EXPECT_NEAR(cart->output_radius[i], first_radius, 0.001);
  }

  delete cart;
  delete nbs;
}

}  // namespace test
}  // namespace geoda
