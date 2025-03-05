import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        console: 'readonly',
        requestAnimationFrame: 'readonly',
        customElements: 'readonly',
        Audio: 'readonly',
      },
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
    plugins: {
      astro: eslintPluginAstro,
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
    },
  },
];
