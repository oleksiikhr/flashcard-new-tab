import HomePage from '../pages/HomePage';
import { theme } from '../config/settings';
import { applyTheme, generateFeed } from './bus';
import '../styles/index.scss';
import pageManager from '../pages/PageManager';

generateFeed(10);

applyTheme(theme.selectorId);

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
