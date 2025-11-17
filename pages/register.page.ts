import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private btnIndividualJoinNow = this.page
    .getByRole('heading', { name: 'Join us as an individual' })
    .locator('..')
    .getByRole('button', { name: 'Join Now' })
    .first();

  private btnCorporateJoinNow = this.page
    .getByRole('heading', { name: 'Join as a Corporate' })
    .locator('..')
    .getByRole('button', { name: 'Join Now' })
    .last();

  private ckbNewAccount = this.page.locator('label').filter({ hasText: 'I want to create a new' });
  private ckbExistingAccount = this.page
    .locator('label')
    .filter({ hasText: 'I want to join my company' });

  async selectNewAccountOption() {
    await this.ckbNewAccount.click();
  }

  async selectExistingAccountOption() {
    await this.ckbExistingAccount.click();
  }

  async clickOnIndividualJoinNow() {
    await this.btnIndividualJoinNow.click();
  }

  async clickOnCorporateJoinNow() {
    await this.btnCorporateJoinNow.click();
  }
}
