import test, { expect } from '@playwright/test';
import { CarFindingPage } from 'pages/car.finding.page';
import { HomePage } from 'pages/home.page';
import { getDateFromToday } from 'utils/dateHelper';

test.describe('Car Finding', { tag: ['@carFinding', '@smokeTest'] }, () => {
  let homePage: HomePage;
  let carFindingPage: CarFindingPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    carFindingPage = new CarFindingPage(page);

    await page.goto('/');
    await homePage.clickOnFindACar();
  });

  test('Verify that user is able to find a car with valid information', async ({}) => {
    const pickUpLocation = 'Yangon Airport (Coach Parking), Mingalardon Township';
    const pickUpDate = getDateFromToday(5);
    const returnDate = getDateFromToday(8);
    const pickUpTime = '10:00';
    const returnTime = '15:00';
    await carFindingPage.selectPickupLocation(pickUpLocation);
    await carFindingPage.selectPickUpDate(pickUpDate);
    await carFindingPage.enterPickupTime(pickUpTime);
    await carFindingPage.selectReturnDate(returnDate);
    await carFindingPage.enterReturnTime(returnTime);
    await carFindingPage.clickOnFindACar();

    await expect(carFindingPage.imgCarResult).toBeVisible();
  });
});
