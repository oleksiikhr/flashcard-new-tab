import Theme from '../../../Domain/Settings/Theme/Theme';
import ThemeType from '../../../Domain/Settings/Theme/ThemeType';
import { SettingsCommandRepository } from '../../../Domain/Settings/Repository/SettingsCommandRepository';

export default class UpdateThemeHandler {
  constructor(private commandRepository: SettingsCommandRepository) {}

  /**
   * @throws {ObjectValueValidation}
   */
  invoke(type: number): Theme {
    const themeType = new ThemeType(type);

    const theme = new Theme(themeType);

    this.commandRepository.update(theme);

    return theme;
  }
}
