import Theme, {
  ThemeRaw,
} from '../../../../Domain/Modules/Settings/Theme/Theme';
import LocalStorage from '../../../Persistence/LocalStorage/LocalStorage';
import { SettingsQueryRepository } from '../../../../Domain/Modules/Settings/Repository/SettingsQueryRepository';

export default class LSSettingsQueryRepository
  implements SettingsQueryRepository
{
  constructor(private storage: LocalStorage) {}

  public findTheme(): Promise<Theme | undefined> {
    const theme = this.storage.getObject<ThemeRaw>('theme');

    if (undefined === theme) {
      return Promise.resolve(undefined);
    }

    return Promise.resolve(Theme.unserialize(theme));
  }
}
