import test, { expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { RegisterPage } from '../../pages/register.page';
import { IndividualRegisterPage } from '../../pages/individual.register.page';
import { generateRandomEmail, generateRandomFullName } from '../../utils/dataHelper';

test.describe(
  'User registration > Individual account',
  { tag: ['@userRegistration', '@individualAccount', '@smokeTest'] },
  () => {
    let homePage: HomePage;
    let registerPage: RegisterPage;
    let individualRegisterPage: IndividualRegisterPage;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registerPage = new RegisterPage(page);
      individualRegisterPage = new IndividualRegisterPage(page);

      await page.goto('/');
      await homePage.clickOnSignUp();
      await registerPage.clickOnIndividualJoinNow();
    });

    test('Verify that user is able to register a new account with valid information', async ({}) => {
      const fullName = generateRandomFullName();
      const email = generateRandomEmail();
      await individualRegisterPage.enterFullName(fullName);
      await individualRegisterPage.enterEmail(email);
      await individualRegisterPage.enterPassword('Hello1@3');
      await individualRegisterPage.enterConfirmPassword('Hello1@3');
      await individualRegisterPage.clickOnSubmit();
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
