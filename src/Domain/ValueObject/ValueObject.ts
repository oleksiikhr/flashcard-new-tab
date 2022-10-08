export default abstract class ValueObject<T> {
  constructor(protected value: T) {}

  public getValue(): T {
    return this.value;
  }

  public isEqual(other: ValueObject<T>): boolean {
    return this.getValue() === other.getValue();
  }
}
