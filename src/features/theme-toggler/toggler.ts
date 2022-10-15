import './toggler.scss';
import { identifyTheme } from '../../entities/theme/useCases/identifyTheme';
import { updateTheme } from '../../entities/theme/useCases/updateTheme';
import { ThemeType } from '../../entities/theme/model/Theme';

let element: HTMLButtonElement | null = null;
let theme = identifyTheme();

const applyPreference = () => {
  document.documentElement?.setAttribute('data-theme', theme.getColor());

  element?.setAttribute('aria-label', theme.getColor());
};

const onDOMContentLoaded = () => {
  element = document.querySelector('[component="theme-toggle"]');

  element?.addEventListener('click', () => {
    theme = updateTheme(
      ThemeType.DARK === theme.getType() ? ThemeType.LIGHT : ThemeType.DARK,
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
