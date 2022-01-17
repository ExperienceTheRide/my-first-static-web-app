import { devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'
import { URL } from 'url'
import fs from 'fs'

const __dirname = new URL('.', import.meta.url).pathname
try {
  if (fs.existsSync(path.join(__dirname, '.env'))) {
    console.log('FOUND THE ENV')
  } else {
    console.log('NO ENV')
  }
} catch(err) {
  console.error(err)
}

dotenv.config({ path: path.join(__dirname, '.env')})

export default {
  globalSetup: path.join(__dirname, 'global-setup'),
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    storageState: path.join(__dirname, 'state.json')
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
}