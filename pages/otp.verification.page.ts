import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { step } from 'utils/step';

export class OTPVerificationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private txtFirstOTPDigit = this.page.getByRole('textbox', {
    name: 'Please enter verification',
  });
  private txtSecondOTPDigit = this.page.getByRole('textbox', {
    name: 'Digit 2',
  });
  private txtThirdOTPDigit = this.page.getByRole('textbox', {
    name: 'Digit 3',
  });
  private txtFourthOTPDigit = this.page.getByRole('textbox', {
    name: 'Digit 4',
  });
  private txtFifthOTPDigit = this.page.getByRole('textbox', {
    name: 'Digit 5',
  });
  private txtSixthOTPDigit = this.page.getByRole('textbox', {
    name: 'Digit 6',
  });
  private btnVerify = this.page.locator('#verifying');
  private btnOk = this.page.getByRole('button', { name: 'OK' });

  @step('Enter OTP')
  async enterOTP(otp: string) {
    await this.txtFirstOTPDigit.fill(otp[0]);
    await this.txtSecondOTPDigit.fill(otp[1]);
    await this.txtThirdOTPDigit.fill(otp[2]);
    await this.txtFourthOTPDigit.fill(otp[3]);
    await this.txtFifthOTPDigit.fill(otp[4]);
    await this.txtSixthOTPDigit.fill(otp[5]);
  }

  @step('Click on Verify button')
  async clickOnVerify() {
    await this.btnVerify.click();
    //Account verified
  }

  @step('Click on OK button')
  async clickOnOk() {
    await this.btnOk.click();
  }
}
