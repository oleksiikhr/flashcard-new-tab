export default class DeleteDeckCommand {
  constructor(private id: number) {}

  public getId(): number {
    return this.id;
  }
}
