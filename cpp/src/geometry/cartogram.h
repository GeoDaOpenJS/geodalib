#ifndef GEODA_GEOMETRY_CARTOMAP_H
#define GEODA_GEOMETRY_CARTOMAP_H

#include <algorithm>
#include <cmath>    // for std::exp
#include <iomanip>  // for std::setprecision
#include <iostream>
#include <limits>  // for std::numeric_limits
#include <memory>  // for std::unique_ptr
#include <vector>

#include "geometry/polygon.h"
#include "utils/UTM.h"
#include "utils/standardize.h"
#include "weights/gal.h"
#include "weights/weights.h"

namespace geoda {

struct CartogramResult {
  std::vector<double> x;
  std::vector<double> y;
  std::vector<double> radius;
  std::vector<Polygon> circles;

  std::vector<double> get_x() const { return x; }
  std::vector<double> get_y() const { return y; }
  std::vector<double> get_radius() const { return radius; }
  std::vector<Polygon> get_circles() const { return circles; }
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

inline static CartogramResult cartogram_utm(int num_obs, double data_min, double data_max, const std::vector<double>& x,
                                            const std::vector<double>& y, const std::unique_ptr<GalElement[]>& gal,
                                            const std::vector<double>& standardized_values, int iterations,
                                            int numberOfPointsPerCircle) {
  std::unique_ptr<CartogramNeighbor> nbs(new CartogramNeighbor(gal.get(), num_obs));

  // use the first point to determine the UTM zone
  double utm_x = x[0], utm_y = y[0];
  char utm_zone[4] = {'\0'};                         // 4 chars is sufficient: 2 digits + 1 letter + null terminator
  UTM::LLtoUTM(y[0], x[0], utm_y, utm_x, utm_zone);  // Fixed parameter order: lat, long

  // Convert X, Y from degrees to UTM
  std::vector<double> x_utm(num_obs);
  std::vector<double> y_utm(num_obs);
  for (int i = 0; i < num_obs; i++) {
    double north, east;
    UTM::LLtoUTM(y[i], x[i], north, east, utm_zone);
    x_utm[i] = east;
    y_utm[i] = north;
  }

  // Calculate bounding box in a single pass
  double xmin = x_utm[0], xmax = x_utm[0], ymin = y_utm[0], ymax = y_utm[0];
  for (int i = 1; i < num_obs; i++) {
    xmin = std::min(xmin, x_utm[i]);
    xmax = std::max(xmax, x_utm[i]);
    ymin = std::min(ymin, y_utm[i]);
    ymax = std::max(ymax, y_utm[i]);
  }

  std::unique_ptr<Cartogram> cart(new Cartogram(nbs.get(), x_utm, y_utm, standardized_values, data_min, data_max));

  cart->improve(iterations > 0 ? iterations : 100);

  // create circles for each observation
  std::vector<geoda::Polygon> polygons(num_obs);
  for (int i = 0; i < num_obs; i++) {
    double output_x = cart->output_x[i];
    double output_y = cart->output_y[i];
    double output_radius = cart->output_radius[i];
    // create a circle with the radius using numberOfPointsPerCircle points on the circle
    // connect the points to form a polygon
    std::vector<double> x_circle;
    std::vector<double> y_circle;
    for (int j = 0; j < numberOfPointsPerCircle; j++) {
      double angle = (static_cast<double>(j) / numberOfPointsPerCircle) * 2 * M_PI;
      x_circle.push_back(output_x + output_radius * cos(angle));
      y_circle.push_back(output_y + output_radius * sin(angle));
    }
    x_circle.push_back(x_circle[0]);
    y_circle.push_back(y_circle[0]);

    bool is_hole = false;
    polygons[i].add(x_circle, y_circle, is_hole);
  }

  // rescale the polygons from Cartogram result original coordinates
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
  double scale = std::min(x_scale, y_scale);

  std::vector<double> result_x(num_obs);
  std::vector<double> result_y(num_obs);
  std::vector<double> result_radius(num_obs);

  // Apply rescale in a single pass
  for (int i = 0; i < num_obs; i++) {
    std::vector<double>& circle_x = polygons[i].x;
    std::vector<double>& circle_y = polygons[i].y;
    for (int j = 0; j < circle_x.size(); j++) {
      circle_x[j] = xmin + (circle_x[j] - output_xmin) / scale;
      circle_y[j] = ymin + (circle_y[j] - output_ymin) / scale;

      // convert from UTM to degrees
      double lat, lng;
      UTM::UTMtoLL(circle_y[j], circle_x[j], utm_zone, lat, lng);
      circle_x[j] = lng;
      circle_y[j] = lat;

      // convert x, y and radius
      double output_x = xmin + (circle_x[j] - output_xmin) / scale;
      double output_y = ymin + (circle_y[j] - output_ymin) / scale;
      double output_radius = cart->output_radius[i] / scale;

      // convert from UTM to degrees
      UTM::UTMtoLL(output_y, output_x, utm_zone, lat, lng);

      // convert radius from UTM to degrees
      output_radius = UTM::UTMtoDegrees(output_radius, lat);
      result_x[i] = lng;                 // x
      result_y[i] = lat;                 // y
      result_radius[i] = output_radius;  // radius
    }
  }

  return CartogramResult{result_x, result_y, result_radius, polygons};
}

inline static CartogramResult cartogram_simple(int num_obs, double data_min, double data_max,
                                               const std::vector<double>& x, const std::vector<double>& y,
                                               const std::unique_ptr<GalElement[]>& gal,
                                               const std::vector<double>& standardized_values, int iterations,
                                               int numberOfPointsPerCircle) {
  std::unique_ptr<CartogramNeighbor> nbs(new CartogramNeighbor(gal.get(), num_obs));

  // Calculate bounding box in a single pass
  double xmin = x[0], xmax = x[0], ymin = y[0], ymax = y[0];
  for (int i = 1; i < num_obs; i++) {
    xmin = std::min(xmin, x[i]);
    xmax = std::max(xmax, x[i]);
    ymin = std::min(ymin, y[i]);
    ymax = std::max(ymax, y[i]);
  }

  std::unique_ptr<Cartogram> cart(new Cartogram(nbs.get(), x, y, standardized_values, data_min, data_max));

  cart->improve(iterations > 0 ? iterations : 100);

  // create circles for each observation
  std::vector<geoda::Polygon> polygons(num_obs);
  for (int i = 0; i < num_obs; i++) {
    double output_x = cart->output_x[i];
    double output_y = cart->output_y[i];
    double output_radius = cart->output_radius[i];
    // create a circle with the radius using numberOfPointsPerCircle points on the circle
    // connect the points to form a polygon
    std::vector<double> x_circle;
    std::vector<double> y_circle;
    for (int j = 0; j < numberOfPointsPerCircle; j++) {
      double angle = (static_cast<double>(j) / numberOfPointsPerCircle) * 2 * M_PI;
      x_circle.push_back(output_x + output_radius * cos(angle));
      y_circle.push_back(output_y + output_radius * sin(angle));
    }
    x_circle.push_back(x_circle[0]);
    y_circle.push_back(y_circle[0]);

    bool is_hole = false;
    polygons[i].add(x_circle, y_circle, is_hole);
  }

  // rescale the polygons from Cartogram result original coordinates
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
  double scale = std::min(x_scale, y_scale);

  std::vector<double> result_x(num_obs);
  std::vector<double> result_y(num_obs);
  std::vector<double> result_radius(num_obs);

  // Apply rescale in a single pass
  for (int i = 0; i < num_obs; i++) {
    std::vector<double>& circle_x = polygons[i].x;
    std::vector<double>& circle_y = polygons[i].y;
    for (int j = 0; j < circle_x.size(); j++) {
      // convert x, y and radius
      double output_x = xmin + (circle_x[j] - output_xmin) / scale;
      double output_y = ymin + (circle_y[j] - output_ymin) / scale;
      double output_radius = cart->output_radius[i] / scale;

      circle_x[j] = output_x;
      circle_y[j] = output_y;

      result_x[i] = output_x;
      result_y[i] = output_y;
      result_radius[i] = output_radius;
    }
  }

  return CartogramResult{result_x, result_y, result_radius, polygons};
}

/**
 * @brief Cartogram algorithm
 *
 * @param geoms The geometries to cartogram.
 * convertToUTM = true in getGeometryCollection
 * @param values The values to cartogram
 * @param iterations The number of iterations to run the cartogram algorithm
 * @param numberOfPointsPerCircle The number of points per circle
 * @return CartogramResult The result of the cartogram algorithm
 */
inline CartogramResult cartogram(const GeometryCollection& geoms, const std::vector<double>& values, int iterations,
                                 int numberOfPointsPerCircle) {
  if (geoms.size() == 0 || geoms.size() != values.size()) {
    return CartogramResult();
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
  for (int i = 0; i < num_obs; i++) {
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

  std::vector<std::vector<double>> cent = geoms.get_centroids();
  double lat_min = cent[0][1], lat_max = cent[0][1], lng_min = cent[0][0], lng_max = cent[0][0];
  for (int i = 0; i < num_obs; i++) {
    x[i] = cent[i][0];
    y[i] = cent[i][1];
    lat_min = std::min(lat_min, cent[i][1]);
    lat_max = std::max(lat_max, cent[i][1]);
    lng_min = std::min(lng_min, cent[i][0]);
    lng_max = std::max(lng_max, cent[i][0]);
  }

  // check if multiple UTM zones from the centroids: 20 degrees difference
  if (lat_max - lat_min > 20 || lng_max - lng_min > 20) {
    return cartogram_simple(num_obs, data_min, data_max, x, y, gal, standardized_values, iterations,
                            numberOfPointsPerCircle);
  }

  return cartogram_utm(num_obs, data_min, data_max, x, y, gal, standardized_values, iterations,
                       numberOfPointsPerCircle);
}

}  // namespace geoda

#endif
