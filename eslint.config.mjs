// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
    // ESLint recommended rules
    js.configs.recommended,

    // React plugin flat config
    pluginReact.configs.flat.recommended,

    // Prettier plugin (recommended rules)
    pluginPrettier,

    {
        files: ['src/**/*.{js,jsx}'], // match JS and JSX files
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser, // window, document, etc.
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },

        // React Hooks plugin (manually configured)
        plugins: {
            'react-hooks': pluginReactHooks,
        },

        rules: {
            'no-unused-vars': 'warn',

            // React recommended rules overrides
            'react/react-in-jsx-scope': 'off',

            // React Hooks recommended rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Prettier enforcement
            'prettier/prettier': 'error',
        },
    },
]
