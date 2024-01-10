/* global module */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ['wasm', 'dist', 'node_modules', 'build-config', 'config'],
  env: {
    es6: true
  },
  reportUnusedDisableDirectives: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  // Specifying plugins gives us access to new rules, but does not enable them automatically
  plugins: ['license-header', 'no-only-tests', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    // Disables conflicting ESLint rules and adds prettier integration as a eslint rule
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      // Typescript files
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      // Plugins like @typescript-eslint provide different ruleset configs that can be extended
      plugins: ['@typescript-eslint'],
      // Extending ruleset configs gives us access to new rules, and enables them automatically
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        // This doesn't enable extra rules, but rather just helps with TS settings
        'plugin:import/typescript'
      ],
      rules: {
        // Rules that we override from config extends
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {'ts-expect-error': 'allow-with-description'}
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            filter: {
              // Allow double underscore prefix for things like symbols
              regex: '^(?:__)',
              match: false
            }
          },
          {
            selector: 'typeLike',
            format: ['PascalCase']
          },
          {
            // Skip properties/variables that require quotes
            selector: [
              'classProperty',
              'objectLiteralProperty',
              'typeProperty',
              'classMethod',
              'objectLiteralMethod',
              'typeMethod',
              'accessor',
              'enumMember'
            ],
            format: null,
            modifiers: ['requiresQuotes']
          }
        ],
        'default-case': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        // Disable any rules that we explicitly enable down below, but are not needed in Typescript
        'consistent-return': 'off'
      }
    },
    {
      // Javascript files
      files: ['*.js'],
      parser: 'espree'
    }
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
  },
  rules: {
    // Rules that we customize on top of eslint:recommended
    'accessor-pairs': ['error', {getWithoutSet: false}],
    'no-shadow': 'error',
    // Rules that we override from config extends
    'eslint-comments/disable-enable-pair': ['error', {allowWholeFile: true}],
    // Rules that we enable from previously defined plugins. See the prefix for plugin name
    // 'license-header/header': ['error', `${__dirname}/config/license-header.js`],
    'no-only-tests/no-only-tests': 'error',
    // import plugin enforces certain import/export conventions
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-self-import': 'error',
    // Note that the usage of 'noUselessIndex' option for this rule makes the tests fail
    'import/no-useless-path-segments': ['error', {noUselessIndex: false}],
    'import/no-mutable-exports': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/extensions': ['error', {json: 'always', spec: 'always'}],
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'type']
        ],
        ['newlines-between']: 'always',
        alphabetize: {order: 'asc', caseInsensitive: true}
      }
    ],
    'import/default': 'error',

    // Opinionated formatting (mostly) rules that we enable on top of the configuration above
    'callback-return': 'error',
    camelcase: 'error',
    complexity: ['error', 11],
    'consistent-return': 'error',
    'default-case': 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'max-depth': ['error', 3],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 5],
    'max-statements': ['error', 25],
    'new-cap': ['error', {newIsCap: true, capIsNew: false, properties: true}],
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-div-regex': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-implicit-coercion': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'no-process-env': 'error',
    'no-process-exit': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    'sort-vars': 'error',
    'spaced-comment': ['error', 'always', {exceptions: ['-', '=', '+', '*']}],
    yoda: 'error'
  }
};
