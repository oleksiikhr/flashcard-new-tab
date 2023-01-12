import { setObject } from '../../../../shared/database/localStorage/localStorage';
import { serializeTheme, Theme, ThemeSerialized } from '../../model/theme';

export const updateThemeRequest = (theme: Theme): void => {
  setObject<ThemeSerialized>('theme', serializeTheme(theme));
};
