import { test, expect } from "@playwright/test";

test.describe('headerPanel', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('TC01.5.1_02 verify that headerPanel has text and buttons Sign In/Create an Account', async ({ page }) => {
        const expectedHeaderPanel = [
            'Click “Write for us” link in the footer to submit a guest post',
            'Sign In',
            'Create an Account'
        ]

        const headerPanel = page.locator('ul[class="header links"]:nth-child(1) li');
        await expect(headerPanel).toHaveCount(3);

        for (let i = 0; i < headerPanel.length; i++) {
            await expect(elements[i]).toBeVisible();
        }

        const actualHeaderPanel = await headerPanel.allInnerTexts().then(elements => elements.map(el => el.trim()));
        expect(actualHeaderPanel).toEqual(expectedHeaderPanel)
    })

    test('TC 01.5.1_01 verify the header is visible', async({ page }) => {
        const baseURL = ("https://magento.softwaretestingboard.com/")
        
        await expect(page).toHaveURL(baseURL)
        await expect(page.locator('.page-header')).toBeVisible() 
    })

    test('TC01.5.1_03 Verify that header panel contains Logo of the Luma shop on the left', async({ page }) => {
        const logo = page.locator('.logo >img');
        
        await expect(logo).toBeVisible();
    })

    test('TC01.5.1_04 Validate header panel and its elements', async ({ page }) => {
        const headerPanel = page.locator('.page-header');
        const headerBoundingBox = await headerPanel.boundingBox();
        const headerTolerance = 50; // Setting up header boundaries to verify it is at the top of the screen;

        await expect(headerPanel).toBeVisible();
        expect(headerBoundingBox.y).toBeLessThanOrEqual(headerTolerance); // Verifying header is at the top of the screen;
        
        const writeForUs = page.getByRole('banner').getByText('Click “Write for us” link in the footer to submit a guest post')
        await expect(writeForUs).toBeVisible();

        const signInButton = page.getByRole('link', {name: 'Sign In'});
        await expect(signInButton).toBeVisible();

        const createAccount = page.getByRole('link', { name: 'Create an Account' });
        await expect(createAccount).toBeVisible();
        
        const logoImage = page.locator('.logo img');
        await expect(logoImage).toBeVisible();

    })

    test('TC01.5.1_04 Validate header elements', async ({ page }) => {
        
        const writeForUs = page.getByRole('banner').getByText('Click “Write for us” link in the footer to submit a guest post')
        await expect(writeForUs).toBeVisible();

        const signInButton = page.getByRole('link', {name: 'Sign In'});
        await expect(signInButton).toBeVisible();

        const createAccount = page.getByRole('link', { name: 'Create an Account' });
        await expect(createAccount).toBeVisible();
        
        const logoImage = page.locator('.logo img');
        await expect(logoImage).toBeVisible();

    })

    test('TC01.5.1_04 Validate header image', async ({ page }) => {
        
        const logoImage = page.locator('.logo img');
        await expect(logoImage).toBeVisible();

    })

})

