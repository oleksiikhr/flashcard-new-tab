import HomePage from '../pages/HomePage';
import { theme } from '../config/settings';
import '../styles/index.scss';
import pageManager from '../pages/PageManager';
import { applyTheme } from './bus';

applyTheme(theme.selectorId);

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
