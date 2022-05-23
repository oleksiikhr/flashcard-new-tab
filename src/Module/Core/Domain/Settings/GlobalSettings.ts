import Theme from './Theme/Theme';

export default class GlobalSettings {
  constructor(private theme: Theme) {}

  getTheme(): Theme {
    return this.theme;
  }
}
