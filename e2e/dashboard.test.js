import { test, expect } from '@playwright/test'

test.describe('dashboard', () => {
    test('it redirects', async ({ page }) => {
        await page.goto('https://nyccommanderdevdashboard.z13.web.core.windows.net/')

        await expect(page).toHaveTitle(/Ride Commander/)
        await expect(page).not.toHaveTitle(/Ride Commander/)
        await expect(page).toHaveTitle(/Ride Commander/)
    })

    test('it shows the user name', async ({ page }) => {
        await page.goto('https://nyccommanderdevdashboard.z13.web.core.windows.net/')

        await expect(page.locator('text=Ride On, Test Account!').first()).toBeVisible()
    })

    test('it shows the connected user', async ({ page }) => {
        await page.goto('https://nyccommanderdevdashboard.z13.web.core.windows.net/')

        const userName = await page.textContent('div[class="userName"]');
        expect(userName).toBe('Test Account');
    })
})