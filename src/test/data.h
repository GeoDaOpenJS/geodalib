#ifndef DATA_H
#define DATA_H

#include <geometry/geometry.h>

#include <vector>

/**
 * @brief Two polygons sharing a common node
 *
 * @return geoda::PolygonCollection
 */
geoda::PolygonCollection TEST_POLYGON_COLLECTION(std::vector<double>{0, 0, 1, 1, 0, 1, 1, 2, 2, 1},
                                                 std::vector<double>{0, 1, 1, 0, 0, 1, 2, 2, 1, 1},
                                                 std::vector<unsigned int>{0, 5}, std::vector<unsigned int>{0, 0},
                                                 std::vector<unsigned int>{1, 1});

/**
 * @brief Three points
 * 
 * @return geoda::PointCollection 
 */
geoda::PointCollection TEST_POINT_COLLECTION(std::vector<double>{0, 1, 2}, std::vector<double>{0, 1, 2},
                                             std::vector<unsigned int>{0, 1, 2}, std::vector<unsigned int>{1, 1, 1});

#endif  // DATA_H
