import ThemeType from './ThemeType';

export type ThemeRaw = {
  type: number;
};

export default class Theme {
  constructor(private type: ThemeType) {}

  public static create(): Theme {
    return new Theme(ThemeType.of(ThemeType.LIGHT));
  }

  public static unserialize(raw: ThemeRaw): Theme {
    return new Theme(ThemeType.of(raw.type));
  }

  public serialize(): ThemeRaw {
    return {
      type: this.type.getValue(),
    };
  }

  public getType(): ThemeType {
    return this.type;
  }
}
