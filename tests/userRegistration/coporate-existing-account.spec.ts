import test, { expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { RegisterPage } from '../../pages/register.page';
import { CorporateRegisterPage } from '../../pages/corporate.register.page';
import { generateRandomCompanyName, generateRandomEmail } from '../../utils/dataHelper';

test.describe(
  'User registration > Corporate > Existing account',
  { tag: ['@userRegistration', '@corporateAccount', '@smokeTest'] },
  () => {
    let homePage: HomePage;
    let registerPage: RegisterPage;
    let corporateRegisterPage: CorporateRegisterPage;
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registerPage = new RegisterPage(page);
      corporateRegisterPage = new CorporateRegisterPage(page);

      await page.goto('/');
      await homePage.clickOnSignUp();
      await registerPage.selectExistingAccountOption();
      await registerPage.clickOnCorporateJoinNow();
    });

    test('Verify that user is able to register a new account with valid information', async ({}) => {
      const companyName = generateRandomCompanyName();
      const email = generateRandomEmail();

      await corporateRegisterPage.selectInquiryType('Add a new member');
      await corporateRegisterPage.enterCompanyName(companyName);
      await corporateRegisterPage.selectIndustry('Banking');
      await corporateRegisterPage.enterContactPerson('Alice Johnson');
      await corporateRegisterPage.enterJobTitle('Business Development Manager');
      await corporateRegisterPage.selectPhoneNumberExt('🇻🇳 VN (+84)');
      await corporateRegisterPage.enterPhoneNumber('5551234567');
      await corporateRegisterPage.enterEmail(email);
      await corporateRegisterPage.clickOnSubmit();

      await expect(corporateRegisterPage.lblSuccessMessage).toHaveText('Successful');
      await expect(corporateRegisterPage.lblSuccessMessageDetail).toHaveText(
        'Thank you for your interest in Yoma Car Share services. Our Key Account team will contact you shortly to assist you with your inquiry.',
      );
    });

    test('Verify that required errors display when user submits registration form without entering any information', async ({}) => {
      await corporateRegisterPage.clickOnSubmit();

      await expect(corporateRegisterPage.lblInquiryError).toHaveText(
        'Please select type of inquiry.',
      );
      await expect(corporateRegisterPage.lblCompanyNameError).toHaveText(
        'Please enter company name.',
      );
      await expect(corporateRegisterPage.lblIndustryError).toHaveText('Please select Industry.');
      await expect(corporateRegisterPage.lblContactPersonError).toHaveText(
        'Please enter contact person.',
      );
      await expect(corporateRegisterPage.lblPhoneNumberExtError).toHaveText(
        'The ext field is required.',
      );
      await expect(corporateRegisterPage.lblPhoneNumberError).toHaveText(
        'Please enter valid phone number.',
      );
      await expect(corporateRegisterPage.lblEmailError).toHaveText('Please enter your email.');
    });

    test('Verify that validation error displays when user submits registration without selecting Inquiry Type', async ({}) => {
      const companyName = generateRandomCompanyName();
      const email = generateRandomEmail();

      await corporateRegisterPage.enterCompanyName(companyName);
      await corporateRegisterPage.selectIndustry('Banking');
      await corporateRegisterPage.enterContactPerson('Alice Johnson');
      await corporateRegisterPage.enterJobTitle('Business Development Manager');
      await corporateRegisterPage.selectPhoneNumberExt('🇻🇳 VN (+84)');
      await corporateRegisterPage.enterPhoneNumber('5551234567');
      await corporateRegisterPage.enterEmail(email);
      await corporateRegisterPage.clickOnSubmit();

      await expect(corporateRegisterPage.lblInquiryError).toHaveText(
        'Please select type of inquiry.',
      );
      await expect(corporateRegisterPage.lblCompanyNameError).toBeHidden();
      await expect(corporateRegisterPage.lblIndustryError).toBeEmpty();
      await expect(corporateRegisterPage.lblContactPersonError).toBeHidden();
      await expect(corporateRegisterPage.lblPhoneNumberExtError).toBeEmpty();
      await expect(corporateRegisterPage.lblPhoneNumberError).toBeEmpty();
      await expect(corporateRegisterPage.lblEmailError).toBeHidden();
    });
  },
);
