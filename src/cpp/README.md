# GeoDa C++ Library

Welcome to the GeoDa C++ library! We appreciate your interest in contributing to our project. This document will guide you through the setup and development process.

## 📋 Prerequisites

Before you begin, ensure you have the following tools installed:

- **CMake** (version 3.5 or higher)
- **Emscripten** (for building WebAssembly)
- **Node.js** (version 18.19.0 recommended)
- **Yarn** (version 4.0.0 recommended)

## 🛠️ Setting Up the Development Environment

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/geoda.git
   cd geoda
   ```

2. **Build the C++ Library**

   Navigate to the `cpp` directory and use CMake to configure and build the project:

   ```bash
   mkdir build
   cd build
   cmake ..
   make
   ```

3. **Run Tests**

   We use Google Test for unit testing. To run the tests, execute:

   ```bash
   make runUnitTests
   ```

   Ensure all tests pass before submitting your contributions.

## 📜 Code Style

We follow the Google C++ style guide. Please ensure your code is formatted using `clang-format` with the provided `.clang-format` configuration:

## 🚀 Building the WASM Module

To build the WebAssembly module, ensure Emscripten is installed and configured. Then, execute the following commands:

```bash
cd src/js
yarn install
yarn wasm
```
