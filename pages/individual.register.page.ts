import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { step } from 'utils/step';

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

  @step('Enter full name')
  async enterFullName(fullName: string) {
    await this.txtFullName.fill(fullName);
  }

  @step('Enter email')
  async enterEmail(email: string) {
    await this.txtEmail.fill(email);
  }

  @step('Enter password')
  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  @step('Enter confirm password')
  async enterConfirmPassword(confirmPassword: string) {
    await this.txtConfirmPassword.fill(confirmPassword);
  }

  @step('Click on Submit button')
  async clickOnSubmit() {
    await this.bntSubmit.click();
  }
}
