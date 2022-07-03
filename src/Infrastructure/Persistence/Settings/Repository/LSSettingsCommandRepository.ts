import { SettingsCommandRepository } from '../../../../Domain/Settings/Repository/SettingsCommandRepository';
import Theme, { ThemeRaw } from '../../../../Domain/Settings/Theme/Theme';
import LocalStorage from '../../Shared/LocalStorage/LocalStorage';

export default class LSSettingsCommandRepository
  implements SettingsCommandRepository
{
  constructor(private storage: LocalStorage) {}

  update(theme: Theme): void {
    this.storage.setObject<ThemeRaw>('theme', theme.serialize());
  }
}
