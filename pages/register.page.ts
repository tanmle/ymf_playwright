import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { step } from 'utils/step';

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

  @step('Select new account option')
  async selectNewAccountOption() {
    await this.ckbNewAccount.click();
  }

  @step('Select existing account option')
  async selectExistingAccountOption() {
    await this.ckbExistingAccount.click();
  }

  @step('Click on Individual Join Now button')
  async clickOnIndividualJoinNow() {
    await this.btnIndividualJoinNow.click();
  }

  @step('Click on Corporate Join Now button')
  async clickOnCorporateJoinNow() {
    await this.btnCorporateJoinNow.click();
  }
}
