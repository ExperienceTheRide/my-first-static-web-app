import { test, expect } from '@playwright/test'

test.describe('home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://white-field-06767c70f.1.azurestaticapps.net/')
  })

  test('it shows the title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Ride Bus Updates/)
  })

  test('it shows the text', async ({ page }) => {
    // Expect an element "to be visible".
    await expect(page.locator('text=Hello World!').first()).toBeVisible()
  })
})