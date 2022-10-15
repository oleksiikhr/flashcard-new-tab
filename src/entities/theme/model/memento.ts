import { Theme } from './Theme';

export type ThemeRaw = {
  type: number;
};

export const serializeTheme = (theme: Theme): ThemeRaw => ({
  type: theme.getType(),
});

export const unserializeTheme = (raw: ThemeRaw): Theme => new Theme(raw.type);
