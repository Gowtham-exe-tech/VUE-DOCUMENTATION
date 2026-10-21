import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// the analyzer only runs when ANALYZE=true (npm run analyze)
const shouldAnalyze = process.env.ANALYZE === 'true'
const analyzerPlugins = shouldAnalyze ? [visualizer({ filename: 'stats/bundle-report.html', template: 'treemap', gzipSize: true, open: true })] : []
export default defineConfig({
  plugins: [vue(), ...analyzerPlugins],
  resolve: {
    // "@" means the src folder, must match paths in tsconfig.app.json
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    // jsdom gives the tests a fake browser DOM
    environment: 'jsdom',
    // only unit/component tests, the e2e folder belongs to Playwright
    include: ['src/**/*.test.ts'],
  },
})
