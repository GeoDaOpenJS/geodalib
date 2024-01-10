

#include <gmock/gmock.h>
#include <gtest/gtest.h>

#include "./features/geometry-collection.h"
#include "./operations/operations.h"

using namespace testing;
using namespace geoda;

namespace {

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_POLYGON) {
  std::vector<double> xs{0, 0, 1, 1, 0, 5, 7, 7, 5, 5};
  std::vector<double> ys{0, 1, 1, 0, 0, 5, 5, 7, 7, 5};
  std::vector<unsigned int> parts{0, 5};
  std::vector<unsigned int> holes{0, 0};
  std::vector<unsigned int> sizes{1, 1};

  PolygonCollection polys(xs, ys, parts, holes, sizes);

  Polygon buffer_result1 = polys.buffer(0, 1, 4);
  Polygon buffer_result2 = polys.buffer(1, 1, 4);

  EXPECT_THAT(buffer_result1.x, ElementsAre(-1, -1, 0, 1, 2, 2, 1, 0, -1));
  EXPECT_THAT(buffer_result1.y, ElementsAre(0, 1, 2, 2, 1, 0, -1, -1, 0));
  // hole
  EXPECT_EQ(buffer_result2.size(), 0);
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_POLYGON_METER) {
  std::vector<double> xs{0, 0, 1, 1, 0};
  std::vector<double> ys{0, 1, 1, 0, 0};
  std::vector<unsigned int> parts{0};
  std::vector<unsigned int> holes{0};
  std::vector<unsigned int> sizes{1};

  bool fix_polygon = false;
  bool convert_to_UTM = true;
  PolygonCollection polys(xs, ys, parts, holes, sizes, fix_polygon, convert_to_UTM);

  double buffer_distance_meters = 1000;
  Polygon buffer_result1 = polys.buffer(0, buffer_distance_meters, 2);

  EXPECT_THAT(buffer_result1.x, ElementsAre(-0.008974322167856652, -0.0089756838605818956, -0.0000014186260077764246,
                                            1.0000013379934458, 1.0089826133460575, 1.0089812527118929,
                                            0.99999996741568653, -4.8734732693844762E-8, -0.008974322167856652));
  EXPECT_THAT(buffer_result1.y, ElementsAre(0.0000041319659032948175, 0.99999585964000759, 1.0090348107799347,
                                            1.0090417427493332, 1.0000027466009365, -0.0000027553674256555597,
                                            -0.0090417652648517553, -0.0090348311488429832, 0.0000041319659032948175));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_POLYGON_CROSS_UTMZONES) {
  std::vector<double> xs{-120.66284179687499, -119.06982421874999, -119.06982421874999, -120.66284179687499,
                         -120.66284179687499};
  std::vector<double> ys{39.487084981687495, 39.487084981687495, 40.66397287638688, 40.66397287638688,
                         39.487084981687495};
  std::vector<unsigned int> parts{0};
  std::vector<unsigned int> holes{0};
  std::vector<unsigned int> sizes{1};

  bool fix_polygon = true;
  bool convert_to_UTM = true;
  PolygonCollection polys(xs, ys, parts, holes, sizes, fix_polygon, convert_to_UTM);

  double buffer_distance_meters = 1600;
  Polygon buffer_result1 = polys.buffer(0, buffer_distance_meters, 2);

  EXPECT_THAT(buffer_result1.x, ElementsAre(-120.68143835355778, -120.68176158526299, -120.66301341468244,
                                            -119.06965245055233, -119.05092118483235, -119.05124470427623,
                                            -119.06998859160541, -120.66267707597844, -120.68143835355778));
  EXPECT_THAT(buffer_result1.y, ElementsAre(39.48707901707791, 40.663976089872115, 40.67837952896874,
                                            40.678366883267152, 40.663963751217381, 39.487091428504058,
                                            39.472688989062561, 39.472675895183258, 39.48707901707791));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_POINT) {
  std::vector<double> xs1{0.2};
  std::vector<double> ys1{0.2};
  std::vector<unsigned int> parts1{0};
  std::vector<unsigned int> sizes1{1};

  PointCollection points(xs1, ys1, parts1, sizes1);

  Polygon buffer_result1 = points.buffer(0, 1, 2);

  EXPECT_THAT(buffer_result1.x, ElementsAre(DoubleEq(1.2), DoubleEq(-0.29999999999999982),
                                            DoubleEq(-0.30000000000000043), DoubleEq(1.2)));
  EXPECT_THAT(buffer_result1.y,
              ElementsAre(0.20000000000000001, -0.66602540378443864, 1.0660254037844383, 0.20000000000000001));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_POINT_METER) {
  std::vector<double> xs{0};
  std::vector<double> ys{0};
  std::vector<unsigned int> parts{0};
  std::vector<unsigned int> sizes{1};

  bool fix_polygon = false;
  bool convert_to_UTM = true;
  PointCollection points(xs, ys, parts, sizes, convert_to_UTM);

  double buffer_distance_meters = 1000;
  Polygon buffer_result1 = points.buffer(0, buffer_distance_meters, 2);

  EXPECT_THAT(buffer_result1.x, ElementsAre(0.0089743739683960655, -0.0044872045172548169, -0.0044872045172548169,
                                            0.0089743739683960655));
  EXPECT_THAT(buffer_result1.y, ElementsAre(0, -0.0078243609386883708, 0.0078243609386883673, 0));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_LINE) {
  std::vector<double> xs1{0.4, 1.2, 1.4, 11.0, 5.4};
  std::vector<double> ys1{0.4, 0.4, 0.4, 11.0, 5.4};
  std::vector<unsigned int> parts1{0, 2};
  std::vector<unsigned int> sizes1{1, 1};

  LineCollection lines(xs1, ys1, parts1, sizes1);

  Polygon buffer_result1 = lines.buffer(0, 0.1, 4);
  Polygon buffer_result2 = lines.buffer(1, 1.0, 4);

  EXPECT_THAT(buffer_result1.x, ElementsAre(0.4, 1.2, 1.3, 1.2, 1.2, 0.40000000000000002, 0.30000000000000004, 0.4));
  EXPECT_THAT(buffer_result1.y, ElementsAre(0.5, 0.5, 0.40000000000000002, 0.30000000000000004, 0.30000000000000004,
                                            0.30000000000000004, 0.40000000000000002, 0.5));
  EXPECT_THAT(buffer_result2.x, ElementsAre(4.6928932188134524, 4.6928932188134524, 10.292893218813452,
                                            11.68940394549079, 11.741204373525063, 2.141204373525063,
                                            0.72872056737352775, 0.65879562647493672, 4.6928932188134524));
  EXPECT_THAT(buffer_result2.y, ElementsAre(5.5255960592023952, 6.1071067811865483, 11.707106781186548,
                                            11.724377111690956, 10.328720567373528, -0.27127943262647236,
                                            -0.34120437352506339, 1.0712794326264725, 5.5255960592023952));
}

TEST(SPATIAL_OPERATIONS_TEST, TEST_BUFFER_LINE_METER) {
  std::vector<double> xs{0, 1};
  std::vector<double> ys{0, 1};
  std::vector<unsigned int> parts{0};
  std::vector<unsigned int> sizes{1};

  bool convert_to_UTM = true;
  LineCollection lines(xs, ys, parts, sizes, convert_to_UTM);

  double buffer_distance_meters = 1000;
  Polygon buffer_result1 = lines.buffer(0, buffer_distance_meters, 2);

  EXPECT_THAT(buffer_result1.x,
              ElementsAre(-0.0063223866519575012, 0.99366790996329834, 1.006371185058542, 1.0063320494495374,
                          1.0063320494495374, 0.0063223628011561672, -0.0063691958480966981, -0.0063223866519575012));
  EXPECT_THAT(buffer_result1.y,
              ElementsAre(0.0064120721580480837, 1.0064131015314235, 1.0063737830688757, 0.99358684364354921,
                          0.99358684364354921, -0.0064121468217393472, -0.0063649469399471728, 0.0064120721580480837));
}
}  // namespace
