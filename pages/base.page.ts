import { Page } from '@playwright/test';

export class BasePage {
  constructor(readonly page: Page) {}

  lblSuccessMessage = this.page.locator('.swal2-title');
  lblSuccessMessageDetail = this.page.locator('.swal2-html-container');
}
