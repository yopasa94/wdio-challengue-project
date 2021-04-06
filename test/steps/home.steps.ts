import { Given } from '@cucumber/cucumber';
import HomePage from '../pages/home.page';

Given('user opens home page', () => {
  HomePage.openUrl();
});
