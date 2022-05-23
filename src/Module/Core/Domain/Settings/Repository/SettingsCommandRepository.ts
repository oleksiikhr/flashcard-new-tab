import Theme from '../Theme/Theme';

export interface SettingsCommandRepository {
  update(theme: Theme): void;
}
