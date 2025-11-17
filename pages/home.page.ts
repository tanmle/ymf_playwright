import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Header
  private lnkFindACar = this.page.getByRole('navigation').getByRole('link', { name: 'Find A Car' });
  private lnkSignIn = this.page.getByRole('navigation').getByRole('link', { name: 'Sign In' });
  private lnkSignUp = this.page.getByRole('navigation').getByRole('link', { name: 'Sign Up' });

  // Footer
  lnkFooterLinks = this.page.locator("footer a[href^='/']");

  async clickOnFindACar() {
    await this.lnkFindACar.click();
  }

  async clickOnSignIn() {
    await this.lnkSignIn.click();
  }

  async clickOnSignUp() {
    await this.lnkSignUp.click();
  }
}
