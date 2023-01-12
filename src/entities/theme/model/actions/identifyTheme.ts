import {Theme, ThemeType} from '../theme';
import {isDarkMedia} from '../util';
import {findThemeRequest} from '../../database/repository/query';

export const identifyTheme = (): Theme => {
  const theme = findThemeRequest();

  if (theme !== null) {
    return theme;
  }

  return {
    type: isDarkMedia() ? ThemeType.DARK : ThemeType.LIGHT,
  };
};
