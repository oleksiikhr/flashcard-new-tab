import { Theme, ThemeType } from '../theme';
import { isDarkMedia } from '../util';
import { findThemeRequest } from '../../database/requests/findThemeRequest';

export const identifyTheme = (): Theme => {
  const theme = findThemeRequest();

  if (theme !== null) {
    return theme;
  }

  if (isDarkMedia()) {
    return {
      type: ThemeType.DARK,
    };
  }

  return {
    type: ThemeType.LIGHT,
  };
};
