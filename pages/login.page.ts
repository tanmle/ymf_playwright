import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { step } from 'utils/step';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private txtEmail = this.page.locator('#username');
  private txtPassword = this.page.locator('#password');
  private btnLogin = this.page.getByRole('button', { name: 'LOGIN' });

  @step('Enter Email Address')
  async enterEmailAddress(email: string) {
    await this.txtEmail.fill(email);
  }

  @step('Enter Password')
  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  @step('Click on Login button')
  async clickOnLogin() {
    await this.btnLogin.click();
  }
}
