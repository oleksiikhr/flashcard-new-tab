import ThemeType from './ThemeType';

export type ThemeRaw = {
  type: number;
};

export default class Theme {
  constructor(private type: ThemeType) {}

  public static createLight(): Theme {
    return new Theme(ThemeType.light());
  }

  public static createDark(): Theme {
    return new Theme(ThemeType.dark());
  }

  public static unserialize(raw: ThemeRaw): Theme | undefined {
    if (!ThemeType.isSupport(raw.type)) {
      return undefined;
    }

    return new Theme(new ThemeType(raw.type));
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
