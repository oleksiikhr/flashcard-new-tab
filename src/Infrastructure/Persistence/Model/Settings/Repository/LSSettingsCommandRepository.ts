import { SettingsCommandRepository } from '../../../../../Domain/Model/Settings/Repository/SettingsCommandRepository';
import Theme, {
  ThemeRaw,
} from '../../../../../Domain/Model/Settings/Theme/Theme';
import LocalStorage from '../../../LocalStorage/LocalStorage';

export default class LSSettingsCommandRepository
  implements SettingsCommandRepository
{
  constructor(private storage: LocalStorage) {}

  update(theme: Theme): void {
    this.storage.setObject<ThemeRaw>('theme', theme.serialize());
  }
}
