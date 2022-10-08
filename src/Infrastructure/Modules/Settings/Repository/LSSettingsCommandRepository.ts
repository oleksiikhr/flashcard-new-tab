import { SettingsCommandRepository } from '../../../../Domain/Modules/Settings/Repository/SettingsCommandRepository';
import Theme, {
  ThemeRaw,
} from '../../../../Domain/Modules/Settings/Theme/Theme';
import LocalStorage from '../../../Persistence/LocalStorage/LocalStorage';

export default class LSSettingsCommandRepository
  implements SettingsCommandRepository
{
  constructor(private storage: LocalStorage) {}

  update(theme: Theme): Promise<void> {
    this.storage.setObject<ThemeRaw>('theme', theme.serialize());

    return Promise.resolve();
  }
}
