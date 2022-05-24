import StringValueObject from '../../../ValueObject/StringValueObject';

export default class ThemeColor extends StringValueObject {
  constructor(protected value: string) {
    // TODO Validate #HEX

    super(value);
  }

  public static createBlue(): ThemeColor {
    return new ThemeColor('#5288c1');
  }
}
