import { test, expect } from "@playwright/test";

test.describe("menuSalePromo-block", () => {
  const links = [
    { name: 'Hoodies and Sweatshirts', url: 'https://magento.softwaretestingboard.com/men/tops-men/hoodies-and-sweatshirts-men.html', title: 'Hoodies & Sweatshirts' },
    { name: 'Jackets', url: 'https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html', title: 'Jackets' },
    { name: 'Tees', url: 'https://magento.softwaretestingboard.com/men/tops-men/tees-men.html', title: 'Tees' },
    { name: 'Pants', url: 'https://magento.softwaretestingboard.com/men/bottoms-men/pants-men.html', title: 'Pants' },
    { name: 'Shorts', url: 'https://magento.softwaretestingboard.com/men/bottoms-men/shorts-men.html', title: 'Shorts' }
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto("/" + "sale.html");
  });

  test("Verify 'Sale' page contains 6 promo-blocks as images", async ({ page }) => {
    const promoBlocks = page.locator("div.blocks-promo img");

    await expect(promoBlocks).toHaveCount(6);
  });

  for (const link of links) {
  test(`Check that ${link.name} link opens the corresponding page`, async ({ page }) => {
      await page.getByRole('link', { name: link.name }).last().click();
      await expect(page).toHaveURL(link.url);
      await expect(page.locator('#page-title-heading > span')).toHaveText(link.title);
    });
  }

  test("Verify redirecting to 'Women Sale' page after click on 'Women's Deals' block", async ({ page }) => {
    const womenSaleURL = "https://magento.softwaretestingboard.com/promotions/women-sale.html";
    await page.locator("a.sale-main").click();

    await expect(page).toHaveTitle("Women Sale");
    expect(page.locator("span[data-ui-id='page-title-wrapper']")).toHaveText("Women Sale");
  });
})