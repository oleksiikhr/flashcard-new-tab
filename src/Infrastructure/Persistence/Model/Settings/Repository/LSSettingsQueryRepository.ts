import SettingsQueryRepository from '../../../../../Domain/Model/Settings/Repository/SettingsQueryRepository';
import Theme, {
  ThemeRaw,
} from '../../../../../Domain/Model/Settings/Theme/Theme';
import LocalStorage from '../../../LocalStorage/LocalStorage';

export default class LSSettingsQueryRepository
  implements SettingsQueryRepository
{
  constructor(private storage: LocalStorage) {}

  public findTheme(): Theme | null {
    const theme = this.storage.getObject<ThemeRaw>('theme');

    if (null === theme) {
      return null;
    }

    return Theme.unserialize(theme);
  }
}
