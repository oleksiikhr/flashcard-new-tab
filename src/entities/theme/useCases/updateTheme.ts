import { Theme } from '../model/Theme';
import { updateThemeRequest } from '../database/requests/updateThemeRequest';

export const updateTheme = (type: number): Theme => {
  const theme = new Theme(type);

  updateThemeRequest(theme);

  return theme;
};
