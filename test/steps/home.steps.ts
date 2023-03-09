import { Given, Then, When } from '@cucumber/cucumber';
import { homePage } from '../pages/home.page';

Given(/^user opens mall home page$/, () => {
  homePage.openUrl('https://www.mall.cz/');
});

When(/^user scroll down to carousels$/, () => {
  homePage.categoriesCarousel.scrollIntoView();
});

Then(/^I should see only '(.+)' element per category$/, (numElements: number) => {
  console.log(homePage.categoriesList.length);
  homePage.categoriesList.forEach((list)=>(expect(list).toHaveLength(numElements)));
});