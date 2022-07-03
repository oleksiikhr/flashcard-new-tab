export type DeckSettingsRaw = {
  recalculate: Recalculate;
};

type Recalculate = {
  count: number;
  hours: number;
  algorithm: 'random';
};

export default class DeckSettings {
  constructor(private settings: DeckSettingsRaw) {}

  public getRecalculate(): Recalculate {
    return this.settings.recalculate;
  }

  public serialize(): DeckSettingsRaw {
    return this.settings;
  }
}
