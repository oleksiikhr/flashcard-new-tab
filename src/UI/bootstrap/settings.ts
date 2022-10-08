import themeToggler from '../pages/home/theme/toggler';
import '../styles/index.scss';
import { renderSettingsPage } from '../pages/settings/render';

themeToggler.register();

document.addEventListener('DOMContentLoaded', () => {
  renderSettingsPage();
});
