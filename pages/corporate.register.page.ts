import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { DropdownElement } from '../elements/dropdown.element';
import { step } from 'utils/step';

export class CorporateRegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private ddlInquiryType = this.page.locator('#react-select-type-placeholder').locator('..');
  lblInquiryError = this.page.locator('label[for="type"] ~ label');
  private txtCompanyName = this.page.locator('#company_name');
  lblCompanyNameError = this.page.locator('label[for="company_name"] ~ label');
  private ddlIndustry = this.page.locator('#react-select-industry-placeholder').locator('..');
  lblIndustryError = this.page.locator('label[for="industry"]').locator('..').locator('~ label');
  private txtContactPerson = this.page.locator('#contact_person');
  lblContactPersonError = this.page.locator('label[for="contact_person"] ~ label');
  private txtJobTitle = this.page.locator('#job_title');
  private ddlPhoneNumberExt = this.page
    .locator('#react-select-country_code-placeholder')
    .locator('..');
  lblPhoneNumberExtError = this.page
    .locator('#react-select-country_code-live-region')
    .locator('..')
    .locator('~ label');
  private txtPhoneNumber = this.page.locator('#national_number');
  lblPhoneNumberError = this.page.locator('#national_number ~ label');
  private txtEmail = this.page.locator('#email');
  lblEmailError = this.page.locator('label[for="email"] ~ label');
  private bntSubmit = this.page.getByRole('button', { name: 'SUBMIT' });

  @step('Select inquiry type')
  async selectInquiryType(optionText: string) {
    await new DropdownElement(this.page, this.ddlInquiryType).selectOption(optionText);
  }

  @step('Enter company name')
  async enterCompanyName(companyName: string) {
    await this.txtCompanyName.fill(companyName);
  }

  @step('Select industry')
  async selectIndustry(optionText: string) {
    await new DropdownElement(this.page, this.ddlIndustry).selectOption(optionText);
  }

  @step('Enter contact person')
  async enterContactPerson(contactPerson: string) {
    await this.txtContactPerson.fill(contactPerson);
  }

  @step('Enter job title')
  async enterJobTitle(jobTitle: string) {
    await this.txtJobTitle.fill(jobTitle);
  }

  @step('Select phone number extension')
  async selectPhoneNumberExt(optionText: string) {
    await new DropdownElement(this.page, this.ddlPhoneNumberExt).selectOption(optionText);
  }

  @step('Enter phone number')
  async enterPhoneNumber(phoneNumber: string) {
    await this.txtPhoneNumber.fill(phoneNumber);
  }

  @step('Enter email')
  async enterEmail(email: string) {
    await this.txtEmail.fill(email);
  }

  @step('Click on Submit button')
  async clickOnSubmit() {
    await this.bntSubmit.click();
  }
}
