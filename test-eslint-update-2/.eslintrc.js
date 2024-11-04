module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  rules: {
    'no-continue': 'off'
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
