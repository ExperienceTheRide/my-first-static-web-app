
import { chromium } from '@playwright/test'
import fs from 'fs'

export default async config => {
    const { storageState } = config.projects[0].use
    console.log(process.env.LOGIN)
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://nyccommanderdevdashboard.z13.web.core.windows.net/')
    await Promise.all([
        page.waitForNavigation(),
        page.fill('input[type="email"]', process.env.LOGIN),
        page.click('input[type="submit"]')
    ]);
    await Promise.all([
        page.waitForNavigation(),
        page.fill('input[type="password"]', process.env.PASSWORD),
        page.click('input[type="submit"]')
    ]);
    await Promise.all([
        page.waitForNavigation(),
        page.click('input[type="submit"]')
    ]);
    await page.context().storageState({ path: storageState });
    await browser.close()
    return () => fs.unlink(storageState, e => (e) ? console.log(e) : null)
}