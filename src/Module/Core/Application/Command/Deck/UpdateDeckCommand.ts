export default class UpdateDeckCommand {
  constructor(
    private id: number,
    private name: string,
    private isActive: boolean,
    private settings: object
  ) {}

  public getId(): number {
    return this.id;
  }

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
