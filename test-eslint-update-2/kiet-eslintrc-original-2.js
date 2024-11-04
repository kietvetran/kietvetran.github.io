module.exports = {
  root: true,
  // extends: ['universe/native', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-continue': 'off'
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
  ],
};
