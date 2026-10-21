import { defineConfig, devices } from '@playwright/test'
const devServerUrl = 'http://localhost:5173'
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: devServerUrl },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright starts the Vite dev server itself before running the tests
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: devServerUrl,
    reuseExistingServer: true,
    timeout: 60000,
  },
})
