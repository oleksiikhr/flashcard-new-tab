export enum ThemeType {
  LIGHT,
  DARK,
}

export type Theme = {
  type: ThemeType;
};

export type ThemeSerialized = {
  type: number;
};

export const serializeTheme = (theme: Theme): ThemeSerialized => ({
  type: theme.type,
});

export const unserializeTheme = (raw: ThemeSerialized): Theme => ({
  type: raw.type,
});

export const getThemeColor = (type: ThemeType): string => {
  if (ThemeType.DARK === type) {
    return 'dark';
  }

  return 'light';
};
