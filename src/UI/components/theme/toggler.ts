import ThemeType from '../../../Domain/Settings/Theme/ThemeType';
import updateTheme from '../../app/bus/settings/updateTheme';
import findTheme from '../../app/bus/settings/findTheme';

let element: HTMLButtonElement | null = null;
let theme = findTheme();

const applyPreference = () => {
  document.documentElement?.setAttribute('data-theme', theme.getType().color());

  element?.setAttribute('aria-label', theme.getType().color());
};

export default {
  register(): void {
    applyPreference();

    window.addEventListener('DOMContentLoaded', () => {
      element = document.querySelector(
        '[component="theme-toggle"]',
      ) as HTMLButtonElement;

      element.addEventListener('click', () => {
        theme = updateTheme(
          theme.getType().isDark() ? ThemeType.LIGHT : ThemeType.DARK,
        );

        applyPreference();
      });

      applyPreference();
    });
  },
};
