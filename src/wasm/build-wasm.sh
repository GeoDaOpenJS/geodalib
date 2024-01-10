#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Use script directory as working directory
pushd "${SCRIPT_DIR}" > /dev/null || exit

emcmake cmake ../ -B ../../build/out -DUNITTEST=OFF -DUSE_EMCC=ON -DCMAKE_BUILD_TYPE=Release

pushd ../../build/out > /dev/null || exit
emmake make geoda
popd > /dev/null || exit

popd > /dev/null || exit

if [[ "$1" != "" ]]; then
  echo "Copying WASM to $1"
  mkdir -p "$1"
  cp "${SCRIPT_DIR}"/../../build/out/wasm/geoda.js "$1"/index.cjs
  cp "${SCRIPT_DIR}"/../../build/out/wasm/geoda.wasm "$1"/geoda.wasm
fi
