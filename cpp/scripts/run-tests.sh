#!/bin/bash

set -e

# Use script directory as working directory
pushd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null || exit

cmake ../ -B ../build/utest
cmake --build ../build/utest -j4

pushd ../build/utest > /dev/null || exit
ctest --verbose
popd > /dev/null || exit

popd > /dev/null || exit
