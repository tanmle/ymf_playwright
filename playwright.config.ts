import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 120_000,
  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        detail: false,
        suiteTitle: false,
        environmentInfo: {
          Platform: os.platform(),
          Env: 'https://carshare.yomafleet.com/',
          NodeVersion: process.version,
        },
      },
    ],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'https://carshare.yomafleet.com/',
    trace: 'off',
    screenshot: 'only-on-failure',
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
