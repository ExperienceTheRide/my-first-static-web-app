import { test, expect } from '@playwright/test'

test.describe('authentication', () => {
    test('it logs in', async ({ page }) => {
        await page.goto('https://nyccommanderdevdashboard.z13.web.core.windows.net/')

        await expect(page).toHaveTitle(/Ride Commander/)
        await expect(page).not.toHaveTitle(/Ride Commander/)
        await expect(page).toHaveTitle(/Ride Commander/)
    })
})