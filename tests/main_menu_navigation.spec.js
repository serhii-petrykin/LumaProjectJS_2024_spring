import { test, expect } from '@playwright/test'

test.describe('Main menu navigation', () => {
  test.beforeEach('Opem main page', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/')
  })

  test('verify Main menu is displayed on the top of the home page in the grey field', async ({
    page
  }) => {
    const menuBar = await page.locator('.navigation')

    await expect(menuBar).toBeVisible()
    await expect(menuBar).toHaveCSS('background-color', 'rgb(240, 240, 240)')
  })
    

  test('verify User can see 6 menu options on the main page', async ({
    page
  }) => {
    let array = ["What's New", 'Women', 'Men', 'Gear', 'Training', 'Sale']

    const menuOptions = await page.locator('.level-top.ui-corner-all')

    for (let i = 0; i < menuOptions.length; i++) {
      await expect(elements[i]).toBeVisible()

      const expectedLink = array[i]
      const actualLink = await link.innerText()

      await expect(menuOptions).toHaveCount(6)
      await expect(actualLink).toEqual(expectedLink)
    }
      
  })
})
