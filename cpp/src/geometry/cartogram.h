#ifndef GEODA_GEOMETRY_CARTOMAP_H
#define GEODA_GEOMETRY_CARTOMAP_H

#include <algorithm>
#include <iomanip>  // for std::setprecision
#include <iostream>
#include <limits>  // for std::numeric_limits
#include <vector>
#include <cmath>  // for std::exp
#include <memory>  // for std::unique_ptr

#include "utils/standardize.h"
#include "weights/gal.h"
#include "weights/weights.h"

namespace geoda {

struct CartogramResult {
  std::vector<double> x;
  std::vector<double> y;
  std::vector<double> radius;

  std::vector<double> get_x() const { return x; }
  std::vector<double> get_y() const { return y; }
  std::vector<double> get_radius() const { return radius; }
};

struct CartogramLeaf {
  int id;
  double xpos;
  double ypos;
  int left;
  int right;
};

class CartogramNeighbor {
 public:
  CartogramNeighbor(geoda::GalElement* gal, int num_obs);
  ~CartogramNeighbor();

  // num_obs + 1  Will follow Dorling convention of arrays, starting from 1
  int bodies;

  // neighbor counts. Critical for border and nbour
  int* nbours;

  // neighbor ids
  int** nbour;

  double** border;  // borders will be 1.0

  double* perimeter;  // 1.0 * nbours[i]
};

class Cartogram {
 public:
  Cartogram(CartogramNeighbor* nbs, const std::vector<double>& orig_x, const std::vector<double>& orig_y,
            const std::vector<double>& orig_data, const double& orig_data_min, const double& orig_data_max);
  virtual ~Cartogram();

  int improve(int num_iters);

  std::vector<double> output_x;
  std::vector<double> output_y;
  std::vector<double> output_radius;
  // estimate of seconds per iteration based on last execution of improve()
  double secs_per_iter;

 protected:
  // number of observations + 1
  int bodies;

  void init_cartogram(const std::vector<double>& orig_x, const std::vector<double>& orig_y,
                      const std::vector<double>& orig_data, const double& orig_data_min, const double& orig_data_max);

  void add_point(int pointer, int axis, int body);
  void get_point(int pointer, int axis, int body);

  int* nbours;
  int** nbour;
  double** border;
  double* perimeter;

  // original population data
  double* people;

  // arrays for positions
  double* x;
  double* y;

  // local arrays used to update x,y after each iteration
  double* xvector;
  double* yvector;

  double* radius;

  // variables that change after initialization
  int number;  // modified by get_point and used as a global variable

  int end_pointer;  // modified by add_point and used as a global variable

  double widest;    // also max in output_radius
  double distance;  // read-only in get_point

  int* list;  // array that is modified by get_point and used in main loop

  CartogramLeaf* tree;  // array of leaf structs

  static const double friction;
  static const double ratio;
  static const double pi;
};

inline CartogramResult cartogram(const GeometryCollection& geoms, const std::vector<double>& values, int iterations) {
  if (geoms.size() == 0 || geoms.size() != values.size()) {
    return CartogramResult{};
  }

  const int num_obs = static_cast<int>(geoms.size());

  // Pre-allocate vectors to avoid reallocations
  std::vector<double> standardized_values(num_obs);
  std::vector<double> x(num_obs);
  std::vector<double> y(num_obs);

  // Standardize values in a single pass
  double sum = 0.0, sum_sq = 0.0;
  for (int i = 0; i < num_obs; ++i) {
    sum += values[i];
    sum_sq += values[i] * values[i];
  }
  double mean = sum / num_obs;
  double std_dev = std::sqrt((sum_sq / num_obs) - (mean * mean));

  // Apply standardization and exponential transformation in one pass
  double data_min = std::numeric_limits<double>::max();
  double data_max = std::numeric_limits<double>::lowest();
  for (int i = 0; i < num_obs; ++i) {
    standardized_values[i] = std::exp((values[i] - mean) / std_dev);
    data_min = std::min(data_min, standardized_values[i]);
    data_max = std::max(data_max, standardized_values[i]);
  }

  // Create queen contiguity weights more efficiently
  bool is_queen = true;
  std::vector<std::vector<unsigned int>> nbrs = geoda::point_contiguity_weights(geoms, is_queen, 0.0);
  std::unique_ptr<GalElement[]> gal(new GalElement[num_obs]);
  for (int i = 0; i < num_obs; i++) {
    gal[i].SetSizeNbrs(nbrs[i].size());
    for (size_t j = 0; j < nbrs[i].size(); j++) {
      if (nbrs[i][j] != static_cast<unsigned int>(i)) {
        gal[i].SetNbr(j, nbrs[i][j]);
      }
    }
  }

  // Get centroids more efficiently
  std::vector<std::vector<double>> cent = geoms.get_centroids();
  for (int i = 0; i < num_obs; i++) {
    x[i] = cent[i][0];
    y[i] = cent[i][1];
  }

  // Calculate bounding box in a single pass
  double xmin = x[0], xmax = x[0], ymin = y[0], ymax = y[0];
  for (int i = 1; i < num_obs; i++) {
    xmin = std::min(xmin, x[i]);
    xmax = std::max(xmax, x[i]);
    ymin = std::min(ymin, y[i]);
    ymax = std::max(ymax, y[i]);
  }

  std::unique_ptr<CartogramNeighbor> nbs(new CartogramNeighbor(gal.get(), num_obs));
  std::unique_ptr<Cartogram> cart(new Cartogram(nbs.get(), x, y, standardized_values, data_min, data_max));

  cart->improve(iterations > 0 ? iterations : 100);

  // Pre-allocate result vectors
  std::vector<double> x_reproj(num_obs);
  std::vector<double> y_reproj(num_obs);
  std::vector<double> radius_reproj(num_obs);

  if (num_obs > 1) {
    // Calculate output bounds in a single pass
    double output_xmin = cart->output_x[0], output_xmax = cart->output_x[0];
    double output_ymin = cart->output_y[0], output_ymax = cart->output_y[0];
    for (int i = 1; i < num_obs; i++) {
      output_xmin = std::min(output_xmin, cart->output_x[i]);
      output_xmax = std::max(output_xmax, cart->output_x[i]);
      output_ymin = std::min(output_ymin, cart->output_y[i]);
      output_ymax = std::max(output_ymax, cart->output_y[i]);
    }

    // Calculate scale factors
    double x_scale = (output_xmax - output_xmin) / (xmax - xmin);
    double y_scale = (output_ymax - output_ymin) / (ymax - ymin);
    double scale = std::max(x_scale, y_scale);

    // Apply reprojection in a single pass
    for (int i = 0; i < num_obs; i++) {
      x_reproj[i] = xmin + (cart->output_x[i] - output_xmin) / scale;
      y_reproj[i] = ymin + (cart->output_y[i] - output_ymin) / scale;
      radius_reproj[i] = cart->output_radius[i] / scale;
    }
  } else {
    x_reproj[0] = cent[0][0];
    y_reproj[0] = cent[0][1];
    radius_reproj[0] = cart->output_radius[0];
  }

  return CartogramResult{x_reproj, y_reproj, radius_reproj};
}
}  // namespace geoda

#endif
