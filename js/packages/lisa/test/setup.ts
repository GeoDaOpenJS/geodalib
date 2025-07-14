// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { setDeliveryWASM } from '../src/init';
import path from 'path';

// Configure WASM for testing
const wasmPath = path.resolve(__dirname, '../wasm/geoda-lisa.wasm');
const wasmUrl = `file://${wasmPath}`;
setDeliveryWASM(wasmUrl);
