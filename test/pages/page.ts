import { ENVIRONMENT, VISIBILITY_STATUS } from '../../enums_definition';
import { WebElement } from 'types_definition';
import { expect } from 'chai';

export default abstract class Page {
  protected getEnvironment(): string {
    return process.env.ENV || ENVIRONMENT.production;
  }

  protected pageIsLoaded(element: WebElement, timeout: number = 10000, timeoutMsg: string = ''): void {
    browser.waitUntil(() => (element.isExisting()), { timeout: timeout, timeoutMsg: timeoutMsg });
  }

  protected waitForElementVisibility(element: WebElement, timeout: number = 10000, reverse: boolean = false): void {
    element.waitForDisplayed({ timeout: timeout, reverse: reverse });
  }

  protected verifyStatusOfOneElement(status: VISIBILITY_STATUS, selector: WebElement): void {
    status === VISIBILITY_STATUS.visible
      ? expect(selector.isExisting() && selector.isDisplayed()).to.be.true
      : expect(selector.isDisplayed()).to.be.false;
  }
}
