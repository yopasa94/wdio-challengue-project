import { Given, Then, When } from '@cucumber/cucumber';
import { homePage } from '../pages/home.page';

Given(/^user opens mall home page$/, () => {
  homePage.openUrl('https://www.mall.cz/');
});

When(/^user scroll down to carousels$/, () => {
  homePage.categoriesCarousel.scrollIntoView();
});

Then(/^I should see only '(.+)' element per category$/, (numElements: number) => {
  expect(homePage.categoriesList).toBeGreaterThan(0)
  homePage.categoriesList.forEach((list)=>(expect(list).toHaveLength(numElements)));
  
});