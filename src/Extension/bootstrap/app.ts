import HomePage from '../../Module/Core/UI/Page/HomePage';
import ApplyThemeCommand from '../../Module/Core/Application/Command/Theme/ApplyThemeCommand';
import { theme } from '../config/settings';
import { pageManager } from './services';
import { applyThemeHandler, createCardHandler } from './bus';
import CreateCardCommand from '../../Module/Core/Application/Command/Card/CreateCardCommand';

applyThemeHandler.invoke(new ApplyThemeCommand(theme.selectorId));

createCardHandler
  .invoke(new CreateCardCommand(2, 'regh', {}, 0))
  .then(console.log)
  .catch(console.error);

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});
