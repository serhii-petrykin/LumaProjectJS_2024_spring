import { test, expect } from "@playwright/test";

test.describe("gearBags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Verify material sidebar menu option exists", async ({ page }) => {
    page.locator("#ui-id-6").hover();
    await page.locator("#ui-id-25").click();
    await expect(page).toHaveTitle("Bags - Gear");
    const materialOption = page.locator("text=Material");
    await expect(materialOption).toBeVisible();
  });
  test.only("Verify user can choose a bag by material leather", async ({ page }) => {
    await page.getByText('Gear', { exact: true }).click();
    await expect(page).toHaveTitle("Gear");
    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/gear.html");
    page.locator("#ui-id-6").hover();
    await page.locator("#ui-id-25").click();
    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/gear/bags.html");
    await page.getByText('Material', { exact: true }).click();
    await page.getByRole('listitem').locator('li').filter({ hasText: ' Leather ' });
    await expect(page.locator('#toolbar-amount')).toHaveCount(2);
  });

});
