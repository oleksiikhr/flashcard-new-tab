import NumberValueObject from '../../Shared/ValueObject/NumberValueObject';

export default class ThemeType extends NumberValueObject {
  public static CLASSIC = 0;

  public static of(type: number): ThemeType {
    return new ThemeType(type);
  }

  public isClassic(): boolean {
    return ThemeType.CLASSIC === this.getValue();
  }
}
