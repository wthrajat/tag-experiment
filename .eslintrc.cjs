module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // Path to your tsconfig.json
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import', // Added back if you want import sorting/rules
    'simple-import-sort' // Added back if you want import sorting/rules
  ],
  extends: [
    'eslint:recommended', // Basic ESLint recommendations
    'plugin:@typescript-eslint/recommended', // TypeScript specific recommendations
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // Uncomment if you want rules that require type information
    'plugin:import/typescript', // For import rules with TypeScript
    'prettier', // Ensures Prettier conflicts are handled (if you use Prettier)
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  root: true,
  env: {
    node: true,
    jest: true, // Assuming you use Jest based on your previous config
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.eslintrc.cjs', // Ignore the ESLint config itself
  ],
  rules: {
    // Basic ESLint rules
    'no-unused-vars': 'off', // Turn off base rule, let TS rule handle it
    'no-fallthrough': 'error',

    // TypeScript ESLint rules
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Better unused var rule

    // Import sorting and other import rules
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error', // Add this for export sorting
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-namespace': 'error',
    'import/no-unassigned-import': 'error', // Useful for preventing side-effect imports without a clear purpose
  },
};
