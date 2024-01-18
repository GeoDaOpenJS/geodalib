set (GEODA_SOURCE_FILES
    ${CMAKE_CURRENT_SOURCE_DIR}/features/geometry.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/features/geometry-collection.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/operations/count.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/operations/centroids.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/operations/join.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/operations/union.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/statistics/local-moran.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/statistics/local-statistics.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/nearest-neighbors.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/distance-weights.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/mapping.cpp
    PARENT_SCOPE)

set (GEODA_HEADER_FILES
    ${CMAKE_CURRENT_SOURCE_DIR}/features/geometry.h
    ${CMAKE_CURRENT_SOURCE_DIR}/features/geometry-collection.h
    ${CMAKE_CURRENT_SOURCE_DIR}/operations/operations.h
    ${CMAKE_CURRENT_SOURCE_DIR}/statistics/local-statistics.h
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/nearest-neighbors.h
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/distance-weights.h
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/mapping.h
    PARENT_SCOPE)
