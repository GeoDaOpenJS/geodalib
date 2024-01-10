

#include "features/geometry.h"

#include <algorithm>
#include <vector>

using namespace geoda;

void Polygon::add(const std::vector<double>& in_x, const std::vector<double>& in_y, bool is_hole) {
  // assert: the size of in_x and in_y should be equal.
  if (in_x.size() == in_y.size()) {
    parts.push_back(parts.empty() ? 0 : x.size());
    std::copy(in_x.begin(), in_x.end(), std::back_inserter(x));
    std::copy(in_y.begin(), in_y.end(), std::back_inserter(y));
    holes.push_back(is_hole);
  }
}

void Line::add(const std::vector<double>& in_x, const std::vector<double>& in_y) {
  // assert: the size of in_x and in_y should be equal.
  if (in_x.size() == in_y.size()) {
    parts.push_back(parts.empty() ? 0 : x.size());
    std::copy(in_x.begin(), in_x.end(), std::back_inserter(x));
    std::copy(in_y.begin(), in_y.end(), std::back_inserter(y));
  }
}

void Point::add(double in_x, double in_y) {
  x.push_back(in_x);
  y.push_back(in_y);
}
