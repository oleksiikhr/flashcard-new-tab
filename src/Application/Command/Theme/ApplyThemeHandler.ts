import ThemeInjector from '../../../Domain/Settings/Theme/Service/ThemeInjector';
import Theme from '../../../Domain/Settings/Theme/Theme';
import SettingsQueryRepository from '../../../Domain/Settings/Repository/SettingsQueryRepository';

export default class ApplyThemeHandler {
  constructor(
    private queryRepository: SettingsQueryRepository,
    private themeInjector: ThemeInjector,
  ) {}

  public invoke(selector: string): void {
    const theme = this.queryRepository.findTheme() ?? Theme.create();

    this.themeInjector.inject(selector, theme);
  }
}
