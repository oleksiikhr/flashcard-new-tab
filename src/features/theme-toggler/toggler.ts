import './toggler.scss';
import { identifyTheme } from '../../entities/theme/model/actions/identifyTheme';
import { updateTheme } from '../../entities/theme/model/actions/updateTheme';
import { getThemeColor, ThemeType } from '../../entities/theme/model/theme';

let element: HTMLButtonElement | null = null;
let theme = identifyTheme();

const applyPreference = () => {
  const color = getThemeColor(theme.type);

  document.documentElement?.setAttribute('data-theme', color);

  element?.setAttribute('aria-label', color);
};

const onDOMContentLoaded = () => {
  element = document.querySelector('[component="theme-toggle"]');

  element?.addEventListener('click', () => {
    theme = updateTheme(
      ThemeType.DARK === theme.type ? ThemeType.LIGHT : ThemeType.DARK,
    );

    applyPreference();
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
