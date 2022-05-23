export default abstract class NumberValueObject {
  constructor(protected value: number) {}

  public getValue(): number {
    return this.value;
  }
}
