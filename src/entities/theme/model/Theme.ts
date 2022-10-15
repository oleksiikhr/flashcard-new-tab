export enum ThemeType {
  LIGHT,
  DARK,
}

export class Theme {
  constructor(private type: ThemeType) {}

  public getType(): ThemeType {
    return this.type;
  }

  public getColor(): string {
    if (ThemeType.DARK === this.getType()) {
      return 'dark';
    }

    return 'light';
  }
}
