export default class DeckSettings {
  constructor(private obj: object) {}

  public serialize(): object {
    return this.obj;
  }
}
