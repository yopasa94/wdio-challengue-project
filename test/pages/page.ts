import { ENVIRONMENT } from '../../enums_definition';
import { WebElement } from 'types_definition';
// import { expect } from 'chai';

export default abstract class Page {
  protected getEnvironment(): string {
    return process.env.ENV || ENVIRONMENT.production;
  }

  protected pageIsLoaded(element: WebElement): void {
    browser.waitUntil(() => {
      return element.isVisible();
    }, 10000);
  }

  protected waitForElementVisibility(element: WebElement): void {
    element.waitForVisible();
    // expect(element.isVisible()).to.be.true;
  }
}
