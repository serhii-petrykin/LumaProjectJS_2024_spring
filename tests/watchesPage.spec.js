import { test, expect } from "@playwright/test";
import { globalAgent } from "http";

test.describe('watchesPage', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('verify navigation to watches page through gear section', async ({ page }) => {
        await page.getByRole('menuitem', { name: 'Gear' }).hover();
        await page.getByText('Watches').click();
        await expect(page).toHaveURL('/gear/watches.html');
        await page.waitForSelector('h1:has-text("Watches")');
    })

    test('verify only watches displayed on watches page', async ({ page }) => {
        await page.getByRole('menuitem', { name: 'Gear' }).hover();
        await page.getByText('Watches').click();
        await page.waitForSelector('.products .product-items li');
        const allTextItems = await page.locator('.products .product-items .product-item-link').allTextContents();
        for (const item of allTextItems) {
            expect(item).toContain('Watch');
        }
    })

    test('verify only sale watches displayed on watches page', async ({ page }) => {
        await page.getByRole('menuitem', { name: 'Gear' }).hover();
        await page.getByText('Watches').click();
        await page.waitForLoadState()
        await page.locator('.filter-options .filter-options-title', { hasText: 'Sale' }).click();
        const countSaleItems = await page.locator('.filter-options .active li .count').textContent();
        const totalSaleItems = parseInt(countSaleItems)
        await page.locator('.filter-options .active li a', { hasText: 'Yes' }).click();
        await expect(page).toHaveURL('/gear/watches.html?sale=1');
        const totalItems = await page.locator('.toolbar-products .toolbar-amount .toolbar-number').first()
        const totalNumberItems = await totalItems.textContent();
        expect(totalNumberItems).toContain(totalSaleItems.toString());
    })

    test('Verify only watches on sale displayed on page', async ({ page }) => {
        await page.getByRole('menuitem', { name: 'Gear' }).hover()
        await page.getByRole('menuitem', { name: 'Watches' }).click()
        await page.getByRole('tab', { name: 'Sale' }).click()
        await page.getByRole('link', { name: " Yes " }).click()
        const saleItemsNumber = await page.locator('#maincontent').getByRole('paragraph').getByText('2').innerText()
        const saleWatches = (await page.locator('.product-items').getByRole('listitem').count()).toString()
        expect(saleItemsNumber).toEqual(saleWatches)
    })

    test('verify that material filter can be set/unset on watch', async ({ page }) => {
        await page.getByRole('menuitem', { name: 'Gear' }).hover();
        await page.getByText('Watches').click();
        await page.getByRole('tab', { name: 'Material' }).click();
        await page.getByText('Leather').click();
        const activeMaterialFilter = page.locator('.filter-value');
        expect(activeMaterialFilter).toHaveText('Leather');
        const clearAllFiltersButton = page.locator('.action.clear.filter-clear');
        await (clearAllFiltersButton).click();
        expect(activeMaterialFilter).not.toBeVisible();
    })

    test('verify user able to reset the selected filter on sale watches page', async ({ page }) => {
        const saleWatchesURL = ("https://magento.softwaretestingboard.com/gear/watches.html?sale=1")
        await page.goto(saleWatchesURL);
        const totalSalesItems = await page.locator('.toolbar-products .toolbar-amount .toolbar-number').first().textContent()
        const totalSalesNumberItems = parseInt(totalSalesItems)
        const activeFilter = page.locator('.filter-value');
        expect(activeFilter).toHaveText('Yes');
        await page.locator('.filter-content .clear', { hasText: 'Clear All' }).click()
        await expect(page).toHaveURL('/gear/watches.html');
        const totalItems = await page.locator('.toolbar-products .toolbar-amount .toolbar-number').first().textContent()
        const totalNumberItems = parseInt(totalItems)
        expect(totalSalesNumberItems).not.toEqual(totalNumberItems)
        expect(activeFilter).not.toBeVisible();
    })
    test('TC 19.1.3_01 | Gear/Watches > Verify Clearing ("Clear all" option) Filters Returns to Full Product List', async({page}) =>{
        test.setTimeout(50000)
        const urlPageWatches = 'https://magento.softwaretestingboard.com/gear/watches.html'
        await page.goto(urlPageWatches);
        await page.getByRole('button', {name: 'Consent'}).click();
        await expect(page).toHaveTitle("Watches - Gear");

        await page.getByRole('tab',{name: 'Activity'}).click();
        await page.locator("li.item > a[href*='activity=16']").click();
        await expect (page.locator('.filter-value')).toHaveText("Athletic");

        const clearAll = page.locator('a.action.clear.filter-clear span');

        await expect(clearAll.isVisible()).resolves.toBe(true);
        await clearAll.click();

        await expect (page).toHaveURL('https://magento.softwaretestingboard.com/gear/watches.html');
        await expect(clearAll).not.toBeVisible();
    });
})
