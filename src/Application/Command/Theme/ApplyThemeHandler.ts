import ApplyThemeCommand from './ApplyThemeCommand';
import ThemeInjector from '../../../Domain/Model/Settings/Theme/Service/ThemeInjector';
import Theme from '../../../Domain/Model/Settings/Theme/Theme';
import SettingsQueryRepository from '../../../Domain/Model/Settings/Repository/SettingsQueryRepository';

export default class ApplyThemeHandler {
  constructor(
    private queryRepository: SettingsQueryRepository,
    private themeInjector: ThemeInjector
  ) {}

  invoke(command: ApplyThemeCommand) {
    const theme = this.queryRepository.findTheme() ?? Theme.create();

    this.themeInjector.inject(command.getSelector(), theme);
  }
}
