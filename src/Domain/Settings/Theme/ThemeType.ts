import NumberValueObject from '../../Shared/ValueObject/NumberValueObject';

export default class ThemeType extends NumberValueObject {
  public static LIGHT = 0;

  public static DARK = 1;

  public static of(type: number): ThemeType | undefined {
    if (!ThemeType.isSupport(type)) {
      return undefined;
    }

    return new ThemeType(type);
  }

  public static light() {
    return new ThemeType(ThemeType.LIGHT);
  }

  public static dark() {
    return new ThemeType(ThemeType.DARK);
  }

  public color(): string {
    if (this.isDark()) {
      return 'dark';
    }

    return 'light';
  }

  public isLight(): boolean {
    return ThemeType.LIGHT === this.getValue();
  }

  public isDark(): boolean {
    return ThemeType.DARK === this.getValue();
  }

  private static isSupport(type: number): boolean {
    return ThemeType.LIGHT === type || ThemeType.DARK === type;
  }
}
