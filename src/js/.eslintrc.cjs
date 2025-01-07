module.exports = {
  root: true,
  ignorePatterns: ['wasm', 'dist', 'node_modules', 'build-config', 'config', 'esbuild.config.ts'],
  env: {
    es6: true
  },
  reportUnusedDisableDirectives: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  // Specifying plugins gives us access to new rules, but does not enable them automatically
  plugins: ['@typescript-eslint', 'prettier', 'no-only-tests', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  settings: {
    // Settings related to eslint-plugin-import
    'import/resolver': {
      // Settings for eslint-import-resolver-typescript which resolves
      // typescript aliases based on tsconfig.json "paths"
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
};
