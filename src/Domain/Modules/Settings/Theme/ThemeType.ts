import ObjectValueValidation from '../../../Error/ObjectValueValidation';
import ValueObject from '../../../ValueObject/ValueObject';

export default class ThemeType extends ValueObject<number> {
  public static LIGHT = 0;

  public static DARK = 1;

  constructor(value: number) {
    if (!ThemeType.isSupport(value)) {
      throw new ObjectValueValidation('Theme type is not supported');
    }

    super(value);
  }

  public static light(): ThemeType {
    return new ThemeType(ThemeType.LIGHT);
  }

  public static dark(): ThemeType {
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

  public static isSupport(type: number): boolean {
    return ThemeType.LIGHT === type || ThemeType.DARK === type;
  }
}