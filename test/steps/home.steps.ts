import { Given } from 'cucumber';
import HomePage from '../pages/home.page';

Given('user opens home page', () => {
  HomePage.openUrl();
});
