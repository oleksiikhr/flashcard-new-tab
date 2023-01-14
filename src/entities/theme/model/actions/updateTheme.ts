import { Theme } from '../theme';
import { updateThemeRequest } from '../../database/repository/themeCommandRepository';

export const updateTheme = (type: number): Theme => {
  const theme: Theme = { type };

  updateThemeRequest(theme);

  return theme;
};
