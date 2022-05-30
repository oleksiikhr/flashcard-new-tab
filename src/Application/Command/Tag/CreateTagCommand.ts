export default class CreateTagCommand {
  constructor(
    private deckId: number,
    private name: string,
    private isActive: boolean
  ) {}

  public getDeckId(): number {
    return this.deckId;
  }

  public getName(): string {
    return this.name;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }
}
