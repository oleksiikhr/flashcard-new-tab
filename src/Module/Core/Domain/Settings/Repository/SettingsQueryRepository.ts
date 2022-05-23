import Theme from '../Theme/Theme';

export default interface SettingsQueryRepository {
  findTheme(): Theme | null;
}
