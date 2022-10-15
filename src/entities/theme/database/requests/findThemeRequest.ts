import { getObject } from '../../../../shared/database/localStorage/localStorage';
import { Theme } from '../../model/Theme';
import { ThemeRaw, unserializeTheme } from '../../model/memento';

export const findThemeRequest = (): Theme | null => {
  const theme = getObject<ThemeRaw>('theme');

  if (null === theme) {
    return null;
  }

  return unserializeTheme(theme);
};
