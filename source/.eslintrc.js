module.exports = {
    root: true,
    extends: [
        'universe/native',
        'universe/shared/typescript-analysis',
        'plugin:@tanstack/eslint-plugin-query/recommended',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { caughtErrors: 'all', caughtErrorsIgnorePattern: '^(e|error)$' },
        ],
        "@typescript-eslint/no-unused-vars": [2, {
            "args": "after-used",
            "vars": "all",
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
          }],
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
