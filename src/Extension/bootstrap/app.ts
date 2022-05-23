import HomePage from '../../Module/Core/UI/Page/HomePage';
import ApplyThemeCommand from '../../Module/Core/Application/Command/Theme/ApplyThemeCommand';
import { theme } from '../config/settings';
import { pageManager } from './services';
import { applyThemeHandler } from './bus';

applyThemeHandler.invoke(new ApplyThemeCommand(theme.selectorId));

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
