cmake_minimum_required(VERSION 3.5)

project(libgeoda
    DESCRIPTION "GeoDa C++ library"
    LANGUAGES CXX
    VERSION 0.0.1
)

set(CMAKE_VERBOSE_MAKEFILE on)
set(CMAKE_CXX_STANDARD 14)

# sources
include_directories(${CMAKE_SOURCE_DIR}/src)
add_subdirectory(src)

# options
include(FetchContent)
option(UNITTEST "Unit test" ON)
if (UNITTEST)
    FetchContent_Declare(googletest
        URL https://github.com/google/googletest/archive/609281088cfefc76f9d0ce82e1ff6c30cc3591e5.zip
    )
    FetchContent_MakeAvailable(googletest)
    enable_testing()
    add_subdirectory(test)
endif()

option(USE_EMCC "Emscripten" OFF)
if (USE_EMCC)
    add_subdirectory(wasm)
endif()

