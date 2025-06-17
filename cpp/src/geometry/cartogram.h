#ifndef GEODA_GEOMETRY_CARTOMAP_H
#define GEODA_GEOMETRY_CARTOMAP_H

#include <algorithm>
#include <iostream>
#include <vector>

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
    // return empty vectors
    return CartogramResult{};
  }

  int num_obs = geoms.size();
  double data_min = *std::min_element(values.begin(), values.end());
  double data_max = *std::max_element(values.begin(), values.end());

  // create queen contiguity weights
  bool is_queen = num_obs > 2 ? false : true;
  std::vector<std::vector<unsigned int>> nbrs = geoda::point_contiguity_weights(geoms, is_queen, 0.0);
  GalElement* gal = new GalElement[num_obs];
  for (int i = 0; i < num_obs; i++) {
    gal[i].SetSizeNbrs(nbrs[i].size());
    for (int j = 0; j < nbrs[i].size(); j++) {
      gal[i].SetNbr(j, nbrs[i][j]);
    }
  }

  // get centroids from geoms
  std::vector<double> x(num_obs);
  std::vector<double> y(num_obs);
  std::vector<std::vector<double>> cent = geoms.get_centroids();
  for (int i = 0; i < num_obs; i++) {
    x[i] = cent[i][0];
    y[i] = cent[i][1];
  }

  // get original bounding box
  double xmin = *std::min_element(x.begin(), x.end());
  double xmax = *std::max_element(x.begin(), x.end());
  double ymin = *std::min_element(y.begin(), y.end());
  double ymax = *std::max_element(y.begin(), y.end());

  CartogramNeighbor* nbs = new CartogramNeighbor(gal, num_obs);
  Cartogram* cart = new Cartogram(nbs, x, y, values, data_min, data_max);
  cart->improve(iterations > 0 ? iterations : 100);

  // reproject the cartogram to the original bounding box
  double output_xmin = *std::min_element(cart->output_x.begin(), cart->output_x.end());
  double output_xmax = *std::max_element(cart->output_x.begin(), cart->output_x.end());
  double output_ymin = *std::min_element(cart->output_y.begin(), cart->output_y.end());
  double output_ymax = *std::max_element(cart->output_y.begin(), cart->output_y.end());
  double output_data_min = *std::min_element(cart->output_radius.begin(), cart->output_radius.end());

  std::vector<double> x_reproj(num_obs);
  std::vector<double> y_reproj(num_obs);
  std::vector<double> radius_reproj(num_obs);

  double x_scale = (output_xmax - output_xmin) / (xmax - xmin);
  double y_scale = (output_ymax - output_ymin) / (ymax - ymin);
  double max_scale = x_scale < y_scale ? x_scale : y_scale;
  double max_offset = x_scale < y_scale ? xmin : ymin;

  if (num_obs > 1) {
    for (int i = 0; i < num_obs; i++) {
      x_reproj[i] = (cart->output_x[i] - output_xmin) / max_scale + max_offset;
      y_reproj[i] = (cart->output_y[i] - output_ymin) / max_scale + max_offset;
      radius_reproj[i] = (cart->output_radius[i] - output_data_min) / max_scale + max_offset;
    }
  } else {
    x_reproj[0] = cent[0][0];
    y_reproj[0] = cent[0][1];
    radius_reproj[0] = cart->output_radius[0];
  }

  CartogramResult result;
  result.x = x_reproj;
  result.y = y_reproj;
  result.radius = radius_reproj;

  delete cart;
  delete nbs;
  delete[] gal;

  return result;
}
}  // namespace geoda

#endif
