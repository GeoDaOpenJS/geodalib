// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include "geometry/geometry.h"

#include <algorithm>
#include <boost/geometry/algorithms/buffer.hpp>
#include <boost/geometry/io/wkt/write.hpp>

#include "utils/UTM.h"

using namespace geoda;

GeometryCollection::GeometryCollection(const std::vector<double>& in_x, const std::vector<double>& in_y,
                                       const std::vector<unsigned int>& parts, const std::vector<unsigned int>& sizes,
                                       bool convert_to_UTM)
    : x(in_x), y(in_y), parts(parts), sizes(sizes), convert_to_UTM(convert_to_UTM) {}

void GeometryCollection::ConvertToUTM(int index, double lat, double lng, double& north, double& east) {
  if (utm_zones[index].empty()) {
    char zone[4] = {'\0'};
    UTM::LLtoUTM(lat, lng, north, east, zone);
    utm_zones[index] = zone;
  } else {
    char* zone = const_cast<char*>(utm_zones[index].c_str());
    UTM::LLtoUTM(lat, lng, north, east, zone);
  }
}
