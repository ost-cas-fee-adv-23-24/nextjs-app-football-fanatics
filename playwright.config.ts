import { defineConfig, devices } from '@playwright/test';
import envVariables from './config/env';

const PORT = envVariables.PORT;

const baseURL = `http://localhost:${PORT}`;


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,

  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: true,
  },

  use: {

    baseURL, // Set the base URL for actions like await page.goto('/'). This means you only need to specify relative paths for actions.
    trace: 'on-first-retry',
    permissions: ["clipboard-read", "clipboard-write"],
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.\/auth\/setup\/index\.ts/ },

    {
      name: 'chromium user authenticated',
      testDir: './tests/auth',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'chromium',
      testIgnore: '**\/tests/auth/**',
      use: {
        ...devices['Desktop Chrome'],
      },
    },


    // more browsers can be tested, only uncomment code below


    // Firefox Test
    // {
    //   name: 'firefox user authenticated',
    //   testDir: './tests/auth',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'firefox',
    //   testIgnore: '**\/tests/auth/**',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // Safari Test
    // {
    //   name: 'safari user authenticated',
    //   testDir: './tests/auth',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'safari',
    //   testIgnore: '**\/tests/auth/**',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },



    /* Test against mobile viewports. */


    // Mobile Chrome Test
    // {
    //   name: 'mobile chrome user authenticated',
    //   testDir: './tests/auth',
    //   use: {
    //     ...devices['Pixel 5'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'mobile chrome',
    //   testIgnore: '**\/tests/auth/**',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },


    // Mobile Safari Test
    // {
    //   name: 'mobile safari user authenticated',
    //   testDir: './tests/auth',
    //   use: {
    //     ...devices['iPhone 12'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'mobile safari',
    //   testIgnore: '**\/tests/auth/**',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],
});
