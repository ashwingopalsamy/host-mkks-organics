import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    ...devices['iPhone 13'],
    baseURL: 'http://127.0.0.1:4173',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
