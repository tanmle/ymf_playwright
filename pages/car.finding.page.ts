import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { DropdownElement } from 'elements/dropdown.element';
import { CalendarElement } from 'elements/calendar.element';
import { step } from 'utils/step';

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
  imgCarResult = this.page.locator("img[data-nimg='responsive']").first();

  @step('Select pickup location')
  async selectPickupLocation(optionText: string) {
    await new DropdownElement(this.page, this.ddlPickupLocation).selectOption(optionText);
  }

  @step('Check return to different location')
  async checkReturnToDifferentLocation() {
    await this.ckbReturnToDifferentLocation.check();
  }

  @step('Select pickup date')
  async selectPickUpDate(pickupDate: string) {
    await this.txtPickupDate.click();
    await new CalendarElement(this.page).selectDate(pickupDate);
  }

  @step('Enter pickup time')
  async enterPickupTime(pickupTime: string) {
    await this.txtPickupTime.click();
    await new CalendarElement(this.page).selectTime(pickupTime);
  }

  @step('Select return date')
  async selectReturnDate(returnDate: string) {
    await this.txtReturnDate.click();
    await new CalendarElement(this.page).selectDate(returnDate);
  }

  @step('Enter return time')
  async enterReturnTime(returnTime: string) {
    await this.txtReturnTime.click();
    await new CalendarElement(this.page).selectTime(returnTime);
  }

  @step('Click on Find A Car button')
  async clickOnFindACar() {
    await Promise.all([
      this.page.waitForResponse(
        (resp) => resp.url().includes('/2/httpapi') && resp.status() === 200,
      ),
      this.btnFindACar.click(),
    ]);
  }
}
