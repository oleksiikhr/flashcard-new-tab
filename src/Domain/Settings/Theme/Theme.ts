import ThemeType from './ThemeType';
import ThemeColor from './ThemeColor';

export type ThemeRaw = {
  type: number | null;
  color: string | null;
};

export default class Theme {
  constructor(private type: ThemeType, private color: ThemeColor) {}

  public static create(): Theme {
    return new Theme(ThemeType.of(ThemeType.CLASSIC), ThemeColor.createBlue());
  }

  public static unserialize(raw: ThemeRaw): Theme {
    // TODO Validate raw
    // console.log(raw); // TODO Or default
    return new Theme(
      ThemeType.of(raw.type ?? ThemeType.CLASSIC),
      raw.color ? new ThemeColor(raw.color) : ThemeColor.createBlue(),
    );
  }

  public serialize(): ThemeRaw {
    return {
      type: this.type.getValue(),
      color: this.color.getValue(),
    };
  }

  public getType(): ThemeType {
    return this.type;
  }

  public getColor(): ThemeColor {
    return this.color;
  }
}
