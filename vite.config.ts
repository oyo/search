import { defineConfig } from 'vite-plus'

export default defineConfig({
  base: '/search/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    semi: false,
    singleQuote: true,
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error', 'unicorn/no-thenable': 'off' },
    options: { typeAware: true, typeCheck: true },
  },
})
