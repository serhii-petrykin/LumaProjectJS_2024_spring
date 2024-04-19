import { test, expect } from '@playwright/test'

test.describe('Main menu navigation', () => {
    test.beforeEach('Opem main page', async () => {
        await page.goto('https://magento.softwaretestingboard.com')
    })
    
    test('verify that Main menu is displayed on the top of the home page in the grey field', async ({ page }) => {
        
    })


    test('verify that user can see menu options on the main page', async ({ page }) => {
        
    })
})