import SettingsQueryRepository from '../../../Domain/Settings/Repository/SettingsQueryRepository';
import Theme from '../../../Domain/Settings/Theme/Theme';

export default class FindThemeHandler {
  constructor(private queryRepository: SettingsQueryRepository) {}

  public invoke() {
    return this.queryRepository.findTheme() ?? Theme.create();
  }
}
