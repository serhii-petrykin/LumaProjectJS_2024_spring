import { test, expect } from "@playwright/test";
test.describe("Check logo icon navigation", () => {
  test("Click on LOGO", async ({ page }) => {
    let linksArr = [
      "https://magento.softwaretestingboard.com/what-is-new.html",
      "https://magento.softwaretestingboard.com/women.html",
      "https://magento.softwaretestingboard.com/men.html",
      "https://magento.softwaretestingboard.com/gear.html",
      "https://magento.softwaretestingboard.com/training.html",
      "https://magento.softwaretestingboard.com/sale.html",
      "https://magento.softwaretestingboard.com/customer/account/create/",
    ];

    for (let i = 0; i < linksArr.length; i++) {
      let link = linksArr[i];
      await page.goto(link);
      await page.locator(".logo").click();
      await expect(page).toHaveURL("https://magento.softwaretestingboard.com");
    }
  });

  test('reload Home page when click on the logo', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByLabel('store logo').click()
  
    await page.reload();
    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/');
  });  
});
