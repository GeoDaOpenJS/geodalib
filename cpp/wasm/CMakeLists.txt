
set (WASM_SOURCE_FILES
        ${GEODA_SOURCE_FILES}
        wasm-wrapper.cpp)

if(USE_EMCC)
    set(CMAKE_CXX_STANDARD 14)
    set(CMAKE_CXX_STANDARD_REQUIRED ON)

    set(CMAKE_C_COMPILER emcc)
    set(CMAKE_CPP_COMPILER em++)
    set(CMAKE_CXX_COMPILER em++)
    unset(_CMAKE_APPLE_ARCHS_DEFAULT)

    #set(CMAKE_CXX_FLAGS "-g --bind -s ASSERTIONS=1 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1")
    set(CMAKE_CXX_FLAGS "-O2 -DNDEBUG")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} --bind -s ASSERTIONS=0 -s WASM=1 -s MAXIMUM_MEMORY=3072MB -s ALLOW_MEMORY_GROWTH=1")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -s NO_FILESYSTEM=1 -s USE_BOOST_HEADERS=1")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -s MODULARIZE=1")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -s 'EXPORT_NAME=geoda' --embind-emit-tsd geoda.d.ts")
endif()

add_executable(geoda ${WASM_SOURCE_FILES})

target_compile_definitions(geoda PRIVATE __EMCC__=1)
target_compile_definitions(geoda PRIVATE EMCC_DEBUG=0)

target_include_directories(geoda PUBLIC ${CMAKE_SOURCE_DIR}/src)
