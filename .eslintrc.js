module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: [
    '@typescript-eslint',
    // '@typescript-eslint/tslint',
    'import',
    'simple-import-sort',
    'unused-imports',
  ],

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    // 'import/order': 'error',
    'new-cap': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-else-return': 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    eqeqeq: ['error', 'always'],
  },
  settings: {
    'import/resolver': {},
  },
  ignorePatterns: ['/*.js'],
};

/* module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['import', 'simple-import-sort', 'strict-booleans'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'import/no-default-export': 'error',
    'import/no-named-as-default-member': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'strict-booleans/no-nullable-numbers': 'error',
    'no-undef': 'off',
    'new-cap': 'error',
    curly: 'error',
  },
  ignorePatterns: ['/*.js'],
}; /* */
