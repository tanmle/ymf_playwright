import test, { expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';

test.describe('Static Pages', { tag: ['@staticPages', '@smokeTest'] }, () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await page.goto('/');
  });

  test('Verify that all footer links load successfully without errors', async ({ page }) => {
    const footerLinks = await homePage.lnkFooterLinks.all();
    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      if (href) {
        await link.click();
        await expect(page).toHaveURL(new RegExp(href));
        await page.waitForLoadState('load');
        await page.goBack();
      }
    }
  });
});
