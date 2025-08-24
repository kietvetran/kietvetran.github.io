import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'tsconfig.json',
      'package-lock.json',
      'webpack.config.js',
      'jest.config.js',
      'dist/**',
      'public/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
    },
    extends: ['js/recommended'],
    rules: {
      // Enable the prettier/prettier rule to report Prettier formatting issues as ESLint errors
      'prettier/prettier': 'error',

      'no-unused-vars': 'off', // or '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Disable ESLint rules that conflict with Prettier's formatting
      ...prettierConfig.rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
]);
