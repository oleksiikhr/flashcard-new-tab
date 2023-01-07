import { Theme, ThemeType } from '../model/Theme';
import { isDarkMedia } from '../model/util';
import { findThemeRequest } from '../database/requests/findThemeRequest';

export const identifyTheme = (): Theme => {
  const theme = findThemeRequest();

  if (theme !== null) {
    return theme;
  }

  if (isDarkMedia()) {
    return new Theme(ThemeType.DARK);
  }

  return new Theme(ThemeType.LIGHT);
};
