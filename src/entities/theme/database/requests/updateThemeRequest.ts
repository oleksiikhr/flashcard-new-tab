import { setObject } from '../../../../shared/database/localStorage/localStorage';
import { Theme } from '../../model/Theme';
import { serializeTheme, ThemeRaw } from '../../model/memento';

export const updateThemeRequest = (theme: Theme): void => {
  setObject<ThemeRaw>('theme', serializeTheme(theme));
};
