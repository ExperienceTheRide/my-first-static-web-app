import { test, expect } from '@playwright/test'

test.describe('dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://white-field-06767c70f.1.azurestaticapps.net/dashboard')
  })

  test('it shows the title', async ({ page }) => {
    // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Commander Dashboard/)
  })

  test('it shows the text', async ({ page }) => {
    // Expect an element "to be visible".
  await expect(page.locator('text=This is the dashboard!').first()).toBeVisible()
  })

  test('it fails', async ({ page }) => {
    // Expect an element "to be visible".
  await expect(page.locator('text=This is NOT the dashboard!').first()).toBeVisible()
  })
})