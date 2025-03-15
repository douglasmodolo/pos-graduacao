import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { ignores: ['node_modules', 'dist'] }, // Ignorar pastas
  { files: ['**/*.{js,mjs,cjs,ts}'] }, // Arquivos analisados
  { languageOptions: { globals: globals.node } }, // Ambiente Node.js
  pluginJs.configs.recommended, // Regras JS recomendadas
  ...tseslint.configs.recommended, // Regras TS recomendadas
  {
    rules: {
      semi: ['error', 'never'], // ❌ Proíbe ponto e vírgula
      quotes: ['error', 'single'], // ✅ Obriga uso de aspas simples
    },
  },
]
