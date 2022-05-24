import HomePage from '../../UI/Page/HomePage';
import ApplyThemeCommand from '../../Application/Command/Theme/ApplyThemeCommand';
import { theme } from '../config/settings';
import { pageManager } from './services';
import { applyThemeHandler } from './bus';
import '../styles/index.scss';

applyThemeHandler.invoke(new ApplyThemeCommand(theme.selectorId));

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
