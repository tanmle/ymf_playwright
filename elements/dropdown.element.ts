import { Locator, Page } from '@playwright/test';

export class DropdownElement {
  private dropdownInput: Locator;
  constructor(
    private page: Page,
    private dropdownLocator: Locator,
  ) {
    this.dropdownInput = this.dropdownLocator.locator('.select__input');
  }

  dynamicOption = (optionText: string) => this.page.getByRole('option', { name: optionText });

  async selectOption(optionText: string) {
    await this.dropdownLocator.click();
    await this.dropdownInput.fill(optionText);
    const optionLocator = this.dynamicOption(optionText);
    await optionLocator.click();
  }
}
