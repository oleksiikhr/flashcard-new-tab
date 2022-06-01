import HomePage from '../pages/HomePage';
import { theme } from '../config/settings';
import { applyTheme } from './bus';
import '../styles/index.scss';
import pageManager from '../pages/PageManager';

applyTheme(theme.selectorId);

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
