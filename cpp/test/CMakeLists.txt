
include_directories(${gtest_SOURCE_DIR}/include ${gtest_SOURCE_DIR})

# Add test cpp file
set(TEST_SOURCE_FILES
    ${GEODA_SOURCE_FILES}
    test-operations.cpp
    test-statistics.cpp
    test-weights.cpp
    test-union.cpp
    test-count.cpp
    test-join-overlaps.cpp
    test-join-crosses.cpp
    test-join-equals.cpp
    test-join-intersects.cpp
    test-join-touches.cpp
    test-buffer.cpp
    test-join-within.cpp)

add_executable(runUnitTests ${TEST_SOURCE_FILES})

find_package(Boost 1.75.0)
if(Boost_FOUND)
    target_include_directories(runUnitTests PUBLIC ${Boost_INCLUDE_DIRS})
else()
    FetchContent_Declare(boost
        URL https://boostorg.jfrog.io/artifactory/main/release/1.75.0/source/boost_1_75_0.tar.bz2
    )
    FetchContent_MakeAvailable(boost)
    FetchContent_GetProperties(boost SOURCE_DIR BOOST_SRC_DIR)
    target_include_directories(runUnitTests PUBLIC ${BOOST_SRC_DIR})
endif()


target_include_directories(runUnitTests PUBLIC
    ${gtest_SOURCE_DIR}/include
    ${gmock_SOURCE_DIR}/include
    ${CMAKE_SOURCE_DIR}/src)

target_link_libraries(runUnitTests
    gtest
    gtest_main)

add_test(runUnitTests runUnitTests)
