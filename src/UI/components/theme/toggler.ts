import ThemeType from '../../../Domain/Modules/Settings/Theme/ThemeType';
import { updateTheme } from '../../../Application/Theme/UpdateTheme';
import { findTheme } from '../../../Application/Theme/FindTheme';

let element: HTMLButtonElement | null = null;
let theme = findTheme.invoke();

const applyPreference = () => {
  theme
    .then((result) => {
      document.documentElement?.setAttribute(
        'data-theme',
        result.getType().color(),
      );

      element?.setAttribute('aria-label', result.getType().color());
    })
    .catch((err) => console.error(err));
};

const onDOMContentLoaded = () => {
  element = document.querySelector(
    '[component="theme-toggle"]',
  ) as HTMLButtonElement;

  element.addEventListener('click', () => {
    theme
      .then((result) => {
        theme = updateTheme.invoke(
          result.getType().isDark() ? ThemeType.LIGHT : ThemeType.DARK,
        );

        applyPreference();
      })
      .catch((err) => console.error(err));
  });

  applyPreference();

  window.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
};

export default {
  register(): void {
    applyPreference();

    window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
  },
};
