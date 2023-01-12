import { getObject } from '../../../../shared/database/localStorage/localStorage';
import { Theme, ThemeSerialized, unserializeTheme } from '../../model/theme';

export const findThemeRequest = (): Theme | null => {
  const theme = getObject<ThemeSerialized>('theme');

  if (theme === null) {
    return null;
  }

  return unserializeTheme(theme);
};
