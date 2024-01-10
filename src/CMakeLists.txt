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
option(USE_EMCC "Emscripten" ON)
if (USE_EMCC)
    add_subdirectory(wasm)
endif()

