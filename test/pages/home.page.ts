import { WebElement } from 'types_definition';
import configurationData from '../data/configuration.data';
import Page from './page';

class HomePage extends Page {
  public get loginContainer(): WebElement { return $('login-container'); }
  public get loginField(): WebElement { return $('login-field'); }
  public get passwordField(): WebElement { return $('password-field'); }
  public get submitButton(): WebElement { return $('submit-button'); }
  public get loginMessageField(): WebElement { return $('login-message-field'); }

  public openUrl() {
    const pageUrl = this.getBaseUrl();

    browser.deleteCookie('cookieName');
    browser.url(pageUrl);

    this.waitForElementVisibility(this.loginContainer);
    this.login();

    this.pageIsLoaded(this.loginMessageField);
  }

  protected getBaseUrl(): string {
    const environment: string = this.getEnvironment();
    return configurationData.PAGE_URLS[environment];
  }

  private login(): void {
    this.loginField.setValue('login');
    this.passwordField.setValue('password');
    this.submitButton.click();
  }
}

export default new HomePage();
