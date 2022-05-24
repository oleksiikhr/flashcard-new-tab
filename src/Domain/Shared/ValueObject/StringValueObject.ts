export default abstract class StringValueObject {
  constructor(protected value: string) {}

  public getValue(): string {
    return this.value;
  }
}
