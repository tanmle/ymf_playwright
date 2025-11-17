import { Page } from '@playwright/test';

export class CalendarElement {
  constructor(private page: Page) {}

  private txtCurrentYear = this.page.locator('.open input.cur-year');
  private btnCurrentYearUp = this.page.locator('.open input.cur-year ~ .arrowUp');
  private btnCurrentYearDown = this.page.locator('.open input.cur-year ~ .arrowDown');
  private cbbMonth = this.page.locator('.open .flatpickr-monthDropdown-months');
  private lblDay = (day: string) =>
    this.page
      .locator('.open .flatpickr-day:not(.flatpickr-disabled):not(.nextMonthDay)')
      .filter({ hasText: new RegExp(`^${day}$`) });

  private txtHour = this.page.locator('.open .flatpickr-hour');
  private txtMinute = this.page.locator('.open .flatpickr-minute');
  private btnAMPM = this.page.locator('.open .flatpickr-am-pm');

  async selectDate(dateString: string) {
    const [dayStr, monthStr, yearStr] = dateString.split('-');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    await this.txtCurrentYear.click();
    let currentYear = parseInt(await this.txtCurrentYear.inputValue());
    while (currentYear !== year) {
      if (currentYear < year) {
        await this.btnCurrentYearUp.click();
        currentYear++;
      } else {
        await this.btnCurrentYearDown.click();
        currentYear--;
      }
    }

    await this.cbbMonth.selectOption({ value: month.toString() });
    await this.lblDay(day.toString()).click();
  }

  async selectTime(timeString: string) {
    const [hoursStr, minutesStr] = timeString.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    await this.txtHour.click();
    await this.txtHour.fill(hours.toString());

    this.txtMinute.click();
    await this.txtMinute.fill(minutes.toString());

    const isPM = hours >= 12;
    const currentAMPM = (await this.btnAMPM.textContent())?.trim();
    if ((isPM && currentAMPM === 'AM') || (!isPM && currentAMPM === 'PM')) {
      await this.btnAMPM.click();
    }
  }
}
