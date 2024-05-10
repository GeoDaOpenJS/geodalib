set (GEODA_SOURCE_FILES
    ${CMAKE_CURRENT_SOURCE_DIR}/geometry/geometry.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/sa/lisa.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/distance-weights.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/contiguity-weights.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/quantile-breaks.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/natural-breaks.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/equal-interval-breaks.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/percentile-breaks.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/box-breaks.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/stddev-breaks.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/linear-regression.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/dense-vector.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/mix.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/diagnostic-report.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/ML_im.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/PowerLag.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/PowerSymLag.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/SparseVector.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/SparseMatrix.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/SparseRow.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/Weights.cpp
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/smile2.cpp
    PARENT_SCOPE)

set (GEODA_HEADER_FILES
    ${CMAKE_CURRENT_SOURCE_DIR}/geometry/geometry.h
    ${CMAKE_CURRENT_SOURCE_DIR}/sa/lisa.h
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/weights.h
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/gal.h
    ${CMAKE_CURRENT_SOURCE_DIR}/weights/partition.h
    ${CMAKE_CURRENT_SOURCE_DIR}/mapping/mapping.h
    ${CMAKE_CURRENT_SOURCE_DIR}/utils/jc_voronoi.h
    ${CMAKE_CURRENT_SOURCE_DIR}/utils/UTM.h
    ${CMAKE_CURRENT_SOURCE_DIR}/regression/regression.h
    PARENT_SCOPE)
