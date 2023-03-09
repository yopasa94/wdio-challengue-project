import { WebElement } from 'types_definition';
import configurationData from '../data/configuration.data';
import Page from './page';

class HomePage extends Page {
  public get headerLogo(): WebElement { return $('.header__big-logo'); }
  public get categoriesCarousel(): WebElement { return $('.homepage__container'); }
  public get categoriesList(): WebElement[] { return $$('.hooper-list'); }

  public openUrl(url: string) {
    browser.url(url);

    const x = browser.getUrl();
    this.headerLogo.waitForDisplayed();
  }
}

export const homePage =  new HomePage();
