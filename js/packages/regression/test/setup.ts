// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

import { setDeliveryWASM } from '../src/init';
import path from 'path';

// Configure WASM for testing
const wasmPath = path.resolve(__dirname, '../wasm/geoda-regression.wasm');
const wasmUrl = `file://${wasmPath}`;
setDeliveryWASM(wasmUrl);

// Add any global setup here
// This file will run before each test file
