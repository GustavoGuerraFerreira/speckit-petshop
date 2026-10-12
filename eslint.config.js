import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const CONTENT_IMPORT_RESTRICTION = {
  patterns: [
    {
      group: ['@/content', '@/content/*'],
      message: 'Seções e componentes recebem conteúdo por props (contracts/component-api.md).',
    },
  ],
};

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'specs', '.specify', '.claude'] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'jsx-a11y': jsxA11y },
    extends: [reactHooks.configs.flat.recommended],
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: 'dangerouslySetInnerHTML é proibido (contracts/security-headers.md).',
        },
        {
          selector: "JSXAttribute[name.name='style']",
          message: 'Estilos inline são proibidos; use tokens via Tailwind.',
        },
        {
          selector: "MemberExpression[property.name='innerHTML']",
          message: 'innerHTML é proibido.',
        },
      ],
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
  {
    files: ['src/sections/**', 'src/layout/**', 'src/components/**'],
    rules: { 'no-restricted-imports': ['error', CONTENT_IMPORT_RESTRICTION] },
  },
  {
    files: ['scripts/**', 'vite.config.ts', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['eslint.config.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
