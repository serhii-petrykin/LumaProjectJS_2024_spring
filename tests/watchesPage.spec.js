import { test, expect } from "@playwright/test";

test.describe('watchesPage', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('verify navigation to watches page through gear section', async ({ page }) => {
        await page.getByRole('menuitem', { name: 'Gear' }).hover();
        await page.getByText('Watches').click();
        await expect(page).toHaveURL('/gear/watches.html');
        await page.getByTitle('Watches').isVisible();
    })
})