module.exports = {
    // root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: ['react-refresh', 'simple-import-sort', 'unused-imports'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:tailwindcss/recommended',
        'prettier',
    ],
    ignorePatterns: [
        'dist',
        '.eslintrc.cjs',
        '!.prettierrc.js',
        // Chrome Extension
        'reading-time',
        // AWS
        'amplify-codegen-temp/models/models',
        'src/ui-components',
        'graphql',
        'aws-exports.js',
        'src/API.ts',

        // CSS
        'src/*.css',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.^' } },

    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-unused-vars': 'off',
        'no-console': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/no-unescaped-entities': 'off',

        'react/display-name': 'off',
        'react/jsx-curly-brace-presence': [
            'warn',
            { props: 'never', children: 'never' },
        ],

        //#region  //*=========== Unused Import ===========
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        //#endregion  //*======== Unused Import ===========

        //#region  //*=========== Import Sort ===========
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': [
            'warn',
            {
                groups: [
                    // ext library & side effect imports
                    ['^@?\\w', '^\\u0000'],
                    // {s}css files
                    ['^.+\\.s?css$'],
                    // Lib and hooks
                    ['^@/lib', '^@/hooks'],
                    // static data
                    ['^@/data'],
                    // components
                    ['^@/components', '^@/container'],
                    // zustand store
                    ['^@/store'],
                    // Other imports
                    ['^@/'],
                    // relative paths up until 3 level
                    [
                        '^\\./?$',
                        '^\\.(?!/?$)',
                        '^\\.\\./?$',
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./\\.\\./?$',
                        '^\\.\\./\\.\\.(?!/?$)',
                        '^\\.\\./\\.\\./\\.\\./?$',
                        '^\\.\\./\\.\\./\\.\\.(?!/?$)',
                    ],
                    ['^@/types'],
                    // other that didnt fit in
                    ['^'],
                ],
            },
        ],
        //#endregion  //*======== Import Sort ===========
    },
    globals: {
        React: true,
        JSX: true,
    },
};
