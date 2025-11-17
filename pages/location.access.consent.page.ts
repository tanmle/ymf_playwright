import { Page } from '@playwright/test';
import { step } from 'utils/step';
import { BasePage } from './base.page';

export class LocationAccessConsentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private btnSkip = this.page.getByRole('button', { name: 'SKIP' });

  @step('Click on Skip button')
  async clickOnSkip() {
    await this.btnSkip.click();
  }
}
