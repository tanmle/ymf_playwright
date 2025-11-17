import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { DropdownElement } from 'elements/dropdown.element';
import { CalendarElement } from 'elements/calendar.element';

export class CarFindingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private ddlPickupLocation = this.page
    .locator('#react-select-pickup_location-placeholder')
    .locator('..');
  private ckbReturnToDifferentLocation = this.page.getByRole('checkbox', {
    name: 'Return to a different location',
  });
  private txtPickupDate = this.page.locator("[name='pickup_date']");
  private txtPickupTime = this.page.locator("[name='pickup_time']");
  private txtReturnDate = this.page.locator("[name='return_date']");
  private txtReturnTime = this.page.locator("[name='return_time']");
  private btnFindACar = this.page.locator('#SimulateButton');
  imgCarResult = this.page.locator("img[data-nimg='responsive']");

  async selectPickupLocation(optionText: string) {
    await new DropdownElement(this.page, this.ddlPickupLocation).selectOption(optionText);
  }

  async checkReturnToDifferentLocation() {
    await this.ckbReturnToDifferentLocation.check();
  }

  async selectPickUpDate(pickupDate: string) {
    await this.txtPickupDate.click();
    await new CalendarElement(this.page).selectDate(pickupDate);
  }

  async enterPickupTime(pickupTime: string) {
    await this.txtPickupTime.click();
    await new CalendarElement(this.page).selectTime(pickupTime);
  }

  async selectReturnDate(returnDate: string) {
    await this.txtReturnDate.click();
    await new CalendarElement(this.page).selectDate(returnDate);
  }

  async enterReturnTime(returnTime: string) {
    await this.txtReturnTime.click();
    await new CalendarElement(this.page).selectTime(returnTime);
  }

  async clickOnFindACar() {
    await Promise.all([
      this.page.waitForResponse(
        (resp) => resp.url().includes('/2/httpapi') && resp.status() === 200,
      ),
      this.btnFindACar.click(),
    ]);
  }
}
