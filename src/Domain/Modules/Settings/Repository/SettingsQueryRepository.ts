import Theme from '../Theme/Theme';

export interface SettingsQueryRepository {
  findTheme(): Promise<Theme | undefined>;
}
