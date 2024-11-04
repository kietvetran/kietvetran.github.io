module.exports = {
  root: true,
  extends: ['universe/native', 'universe/shared/typescript-analysis', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { caughtErrors: 'all', caughtErrorsIgnorePattern: '^(e|error)$' }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
