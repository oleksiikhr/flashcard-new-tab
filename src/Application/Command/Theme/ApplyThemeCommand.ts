export default class ApplyThemeCommand {
  constructor(private selector: string) {}

  public getSelector(): string {
    return this.selector;
  }
}
