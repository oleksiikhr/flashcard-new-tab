import Theme from '../../../Domain/Modules/Settings/Theme/Theme';
import IdentifyColorScheme from '../../../Domain/Modules/Settings/Service/IdentifyColorScheme';
import LSSettingsQueryRepository from '../../../Infrastructure/Modules/Settings/Repository/LSSettingsQueryRepository';

export default class FindThemeHandler {
  constructor(
    private settingsQueryRepository: LSSettingsQueryRepository,
    private identifyColorScheme: IdentifyColorScheme,
  ) {}

  public async invoke(): Promise<Theme> {
    const theme = await this.settingsQueryRepository.findTheme();

    if (undefined !== theme) {
      return theme;
    }

    if (this.identifyColorScheme.isDark()) {
      return Theme.createDark();
    }

    return Theme.createLight();
  }
}
