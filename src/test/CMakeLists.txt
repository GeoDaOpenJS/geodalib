set(TEST_SOURCE_FILES
    ${GEODA_SOURCE_FILES}
    test-weights.cpp)

add_executable(runUnitTests ${TEST_SOURCE_FILES})
add_compile_definitions(BOOST_NO_CXX98_FUNCTION_BASE)
target_compile_options(runUnitTests PUBLIC -Wno-deprecated-declarations)

target_include_directories(runUnitTests PUBLIC
    ${gtest_SOURCE_DIR}
    ${gtest_SOURCE_DIR}/include
    ${gmock_SOURCE_DIR}/include
    ${BOOST_SRC_DIR}
    ${CMAKE_SOURCE_DIR}/src)

target_link_libraries(runUnitTests
    gtest
    gtest_main)

add_test(runUnitTests runUnitTests)
