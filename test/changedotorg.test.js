const { test, expect, chromium, devices } = require('@playwright/test');
const smartphone = devices["iPhone 6"];

const URL = 'https://www.bp42.com/de/donate/platform/projects/1114';

test.describe('Change.org mobile regression tests', () => {

    test.beforeEach(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext({
            ...smartphone
        });
        page = await context.newPage();
    });

    test('Make a donation with moneytransfer', async () => {
        //locators
        const transferInfoLocator = page.locator('text=Bitte überweise deinen Spendenbetrag an unten stehende Bankverbindung');
        const succesMsgLocator = page.locator('text=Vielen Dank für deine Spende!');

        await page.goto(URL);

        //kill cookie popup
        await page.click('button.btn.btn-primary.btn-large.flex-grow.mb-3');

        //perform visual comparison of the landing page
        expect(await page.screenshot()).toMatchSnapshot('defaultLanding.png');

        //fill in the form
        await page.fill('input[name="amount_cents"]', '5');
        await page.click('label[for="direct_deposit"]');
        await page.fill('#first_name', 'Tadeusz');
        await page.fill('#last_name', 'Kosciuszko');
        await page.fill('#email', 't.kosciuszko@betterplace.org');
        await page.click('button.submit-donation-button');
        await expect(transferInfoLocator).toBeVisible();
        await page.click('a.btn.btn-primary.btn-large');
        
        //validate donation made
        await expect(succesMsgLocator).toBeVisible();

    })

}

)