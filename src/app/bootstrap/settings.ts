import themeToggler from '../../features/theme-toggler/toggler';
import { renderSettingsPage } from '../../pages/settings/render';
import '../styles/index.scss';

themeToggler.register();

document.addEventListener('DOMContentLoaded', () => {
  renderSettingsPage();
});
