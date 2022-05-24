import HomePage from '../pages/HomePage';
import { theme } from '../config/settings';
import { applyThemeHandler } from './bus';
import '../styles/index.scss';
import pageManager from '../pages/PageManager';

applyThemeHandler(theme.selectorId);

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
