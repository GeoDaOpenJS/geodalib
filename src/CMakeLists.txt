cmake_minimum_required(VERSION 3.5)

project(libgeoda
    DESCRIPTION "GeoDa C++ library"
    LANGUAGES CXX
    VERSION 0.0.1
)

set(CMAKE_VERBOSE_MAKEFILE on)
set(CMAKE_CXX_STANDARD 14)

# sources
include_directories(${CMAKE_SOURCE_DIR}/cpp)
add_subdirectory(cpp)

# options
option(USE_EMCC "Emscripten" OFF)
if (USE_EMCC)
    add_subdirectory(wasm)
endif()

include(FetchContent)
option(UNITTEST "CPP Test" ON)
if (UNITTEST)
    FetchContent_Declare(googletest
        URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
    )
    # For Windows: Prevent overriding the parent project's compiler/linker settings
    #set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
    FetchContent_MakeAvailable(googletest)
    enable_testing()

    FetchContent_Declare(boost
        URL https://boostorg.jfrog.io/artifactory/main/release/1.75.0/source/boost_1_75_0.tar.bz2
    )
    FetchContent_MakeAvailable(boost)
    FetchContent_GetProperties(boost SOURCE_DIR BOOST_SRC_DIR)
   
    include_directories(${CMAKE_SOURCE_DIR})
    add_subdirectory(test)
endif()