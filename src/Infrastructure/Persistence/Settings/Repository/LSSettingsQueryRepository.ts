import SettingsQueryRepository from '../../../../Domain/Settings/Repository/SettingsQueryRepository';
import Theme, { ThemeRaw } from '../../../../Domain/Settings/Theme/Theme';
import LocalStorage from '../../Shared/LocalStorage/LocalStorage';

export default class LSSettingsQueryRepository
  implements SettingsQueryRepository
{
  constructor(private storage: LocalStorage) {}

  public findTheme(): Theme | undefined {
    const theme = this.storage.getObject<ThemeRaw>('theme');

    if (undefined === theme) {
      return undefined;
    }

    return Theme.unserialize(theme);
  }
}
