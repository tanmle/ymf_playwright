import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { step } from 'utils/step';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Header
  private lnkFindACar = this.page.getByRole('navigation').getByRole('link', { name: 'Find A Car' });
  private lnkSignIn = this.page.getByRole('navigation').getByRole('link', { name: 'Sign In' });
  private lnkSignUp = this.page.getByRole('navigation').getByRole('link', { name: 'Sign Up' });
  dynamicbtnProfileIcon = (fullName: string) =>
    this.page.getByRole('button', { name: `Profile ${fullName}` });

  // Footer
  lnkFooterLinks = this.page.locator("footer a[href^='/']");

  @step('Click on Find A Car link')
  async clickOnFindACar() {
    await this.lnkFindACar.click();
  }

  @step('Click on Sign In link')
  async clickOnSignIn() {
    await this.lnkSignIn.click();
  }

  @step('Click on Sign Up link')
  async clickOnSignUp() {
    await this.lnkSignUp.click();
  }
}
