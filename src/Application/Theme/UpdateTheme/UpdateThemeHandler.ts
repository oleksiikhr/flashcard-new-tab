import Theme from '../../../Domain/Modules/Settings/Theme/Theme';
import ThemeType from '../../../Domain/Modules/Settings/Theme/ThemeType';
import { SettingsCommandRepository } from '../../../Domain/Modules/Settings/Repository/SettingsCommandRepository';

export default class UpdateThemeHandler {
  constructor(private settingsCommandRepository: SettingsCommandRepository) {}

  async invoke(type: number): Promise<Theme> {
    const themeType = new ThemeType(type);

    const theme = new Theme(themeType);

    await this.settingsCommandRepository.update(theme);

    return theme;
  }
}
