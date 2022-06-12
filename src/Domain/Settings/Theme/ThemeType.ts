import NumberValueObject from '../../Shared/ValueObject/NumberValueObject';

export default class ThemeType extends NumberValueObject {
  public static LIGHT = 0;

  public static DARK = 1;

  public static of(type: number): ThemeType {
    return new ThemeType(type);
  }

  public isLight(): boolean {
    return ThemeType.LIGHT === this.getValue();
  }

  public isDark(): boolean {
    return ThemeType.DARK === this.getValue();
  }
}
