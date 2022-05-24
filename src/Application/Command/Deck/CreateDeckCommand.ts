export default class CreateDeckCommand {
  constructor(
    private name: string,
    private isActive: boolean,
    private settings: object
  ) {}

  public getName(): string {
    return this.name;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getSettings(): object {
    return this.settings;
  }
}
