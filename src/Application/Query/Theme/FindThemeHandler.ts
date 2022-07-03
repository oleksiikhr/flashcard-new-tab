import SettingsQueryRepository from '../../../Domain/Settings/Repository/SettingsQueryRepository';
import Theme from '../../../Domain/Settings/Theme/Theme';
import IdentifyColorScheme from '../../../Domain/Settings/Service/IdentifyColorScheme';

export default class FindThemeHandler {
  constructor(
    private identifyColorScheme: IdentifyColorScheme,
    private queryRepository: SettingsQueryRepository,
  ) {}

  public invoke(): Theme {
    const theme = this.queryRepository.findTheme();

    if (undefined !== theme) {
      return theme;
    }

    if (this.identifyColorScheme.isDark()) {
      return Theme.createDark();
    }

    return Theme.createLight();
  }
}
