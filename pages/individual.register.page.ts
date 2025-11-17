import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class IndividualRegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private txtFullName = this.page.locator('#fullName');
  lblFullNameError = this.page.locator('label[for="fullName"] ~ label');
  private txtEmail = this.page.locator('#username');
  lblEmailError = this.page.locator('label[for="username"] ~ label');
  private txtPassword = this.page.locator('#password');
  lblPasswordError = this.page.locator('label[for="password"] ~ label');
  private txtConfirmPassword = this.page.locator('#confirmPassword');
  lblConfirmPasswordError = this.page.locator('label[for="confirmPassword"] ~ label');
  private bntSubmit = this.page.getByRole('button', { name: 'SUBMIT' });

  async enterFullName(fullName: string) {
    await this.txtFullName.fill(fullName);
  }
  async enterEmail(email: string) {
    await this.txtEmail.fill(email);
  }
  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }
  async enterConfirmPassword(confirmPassword: string) {
    await this.txtConfirmPassword.fill(confirmPassword);
  }
  async clickOnSubmit() {
    await this.bntSubmit.click();
  }
}
