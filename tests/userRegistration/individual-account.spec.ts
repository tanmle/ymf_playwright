import test, { expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { RegisterPage } from '../../pages/register.page';
import { IndividualRegisterPage } from '../../pages/individual.register.page';
import { generateRandomEmail, generateRandomFullName } from '../../utils/dataHelper';
import GmailHelper from 'utils/gmailHelper';
import { OTPVerificationPage } from 'pages/otp.verification.page';
import { LocationAccessConsentPage } from 'pages/location.access.consent.page';
import { LoginPage } from 'pages/login.page';

test.describe(
  'User registration > Individual account',
  { tag: ['@userRegistration', '@individualAccount', '@smokeTest'] },
  () => {
    let homePage: HomePage;
    let registerPage: RegisterPage;
    let individualRegisterPage: IndividualRegisterPage;
    let otpVerificationPage: OTPVerificationPage;
    let locationAccessConsentPage: LocationAccessConsentPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registerPage = new RegisterPage(page);
      individualRegisterPage = new IndividualRegisterPage(page);
      otpVerificationPage = new OTPVerificationPage(page);
      locationAccessConsentPage = new LocationAccessConsentPage(page);
      loginPage = new LoginPage(page);

      await page.goto('/');
      await homePage.clickOnSignUp();
      await registerPage.clickOnIndividualJoinNow();
    });

    test('Verify that user is able to register a new account with valid information', async ({}) => {
      const fullName = generateRandomFullName();
      const email = generateRandomEmail();
      const password = 'Hello1@3';
      await individualRegisterPage.enterFullName(fullName);
      await individualRegisterPage.enterEmail(email);
      await individualRegisterPage.enterPassword(password);
      await individualRegisterPage.enterConfirmPassword(password);
      await individualRegisterPage.clickOnSubmit();
      const authClient = await GmailHelper.authorize();
      await GmailHelper.waitForLatestEmail(authClient, email);
      const otp = await GmailHelper.getOtp(authClient, email);
      await otpVerificationPage.enterOTP(otp ?? '');

      await expect(otpVerificationPage.lblSuccessMessageDetail).toHaveText('Account verified');
      await otpVerificationPage.clickOnOk();

      await locationAccessConsentPage.clickOnSkip();

      await loginPage.enterEmailAddress(email);
      await loginPage.enterPassword(password);
      await loginPage.clickOnLogin();

      await expect(homePage.dynamicbtnProfileIcon(fullName)).toBeVisible();
    });

    test('Verify that required errors display when user submits registration form without entering any information', async ({}) => {
      await individualRegisterPage.clickOnSubmit();

      await expect(individualRegisterPage.lblFullNameError).toHaveText(
        'Please enter your full name.',
      );
      await expect(individualRegisterPage.lblEmailError).toHaveText('Please enter your email.');
      await expect(individualRegisterPage.lblPasswordError).toHaveText(
        'Please enter your password.',
      );
      await expect(individualRegisterPage.lblConfirmPasswordError).toHaveText(
        'Please enter your confirm password.',
      );
    });

    test('Verify that validation error displays when user submits registration without entering Full Name', async ({}) => {
      const email = generateRandomEmail();
      await individualRegisterPage.enterEmail(email);
      await individualRegisterPage.enterPassword('Hello1@3');
      await individualRegisterPage.enterConfirmPassword('Hello1@3');
      await individualRegisterPage.clickOnSubmit();

      await expect(individualRegisterPage.lblFullNameError).toHaveText(
        'Please enter your full name.',
      );
      await expect(individualRegisterPage.lblEmailError).toBeHidden();
      await expect(individualRegisterPage.lblPasswordError).toBeHidden();
      await expect(individualRegisterPage.lblConfirmPasswordError).toBeHidden();
    });
  },
);
