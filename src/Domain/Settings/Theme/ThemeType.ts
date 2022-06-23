import NumberValueObject from '../../Shared/ValueObject/NumberValueObject';
import ObjectValueValidation from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/ObjectValueValidation';

export default class ThemeType extends NumberValueObject {
  public static LIGHT = 0;

  public static DARK = 1;

  /**
   * @throws {ObjectValueValidation}
   */
  constructor(value: number) {
    if (!ThemeType.isSupport(value)) {
      throw new ObjectValueValidation('Theme type is not supported');
    }

    super(value);
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

  public static isSupport(type: number): boolean {
    return ThemeType.LIGHT === type || ThemeType.DARK === type;
  }
}
