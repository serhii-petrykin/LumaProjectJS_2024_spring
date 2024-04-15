import { test, expect} from "@playwright/test"; 

test.describe('Registration user with valid data', () => {
    let  firstName, lastName, password, passwordConfirm, email;


    test.beforeEach(async ({ page }) => {
        firstName = 'Svetlana';
        lastName = 'Kudryvzeva';
        password = '12345Sveta!';
        passwordConfirm = '12345Sveta!';

        function generateRandomEmail() {
            const mailbox = Math.random().toString(36).substring(2, 10);
            const domain = "gmail.com";
            return `${mailbox}@${domain}`;
          }

        email = generateRandomEmail();

        await page.goto('/');
        await page.getByRole('link', {name: 'Create an Account'}).click();
    });


    test.only('Check that user can possible to create account with entered all valid fields', async ({ page }) => {
        await page.locator('#firstname').click();
        await page.locator('#firstname').fill(firstName);
        await page.locator('#lastname').click();
        await page.locator('#lastname').fill(lastName);
        await page.locator('#email_address').click();
        await page.locator('#email_address').fill(email);
        await page.locator('#password').click();
        await page.locator('#password').fill(password);
        await page.locator('#password-confirmation').click();
        await page.locator('#password-confirmation').fill(passwordConfirm);
        await page.getByRole('button', { name: "Create an Account" }).click();


        await expect(page.locator('.base[data-ui-id="page-title-wrapper"]')).toHaveText('My Account');
      //  await expect(page.locator('.box-content > p').nth(1)).toHaveText(email);
    });
});