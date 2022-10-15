export type DeckSettingsRaw = {
  recalculate: Recalculate;
};

type Recalculate = {
  count: number;
  hours: number;
  algorithm: 'random';
};

export default class Deck {
  constructor(
    private id: number | undefined,
    private name: string,
    private isActive: boolean,
    private cardsCount: number,
    private activeCardsCount: number,
    private tagsCount: number,
    private settings: DeckSettingsRaw,
    private generateAt: Date,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(
    name: string,
    isActive: boolean,
    settings: DeckSettingsRaw,
  ): Deck {
    return new Deck(
      undefined,
      name,
      isActive,
      0,
      0,
      0,
      settings,
      new Date(),
      new Date(),
      new Date(),
    );
  }

  public update(
    name: string,
    isActive: boolean,
    settings: DeckSettingsRaw,
  ): void {
    this.name = name;
    this.isActive = isActive;
    this.settings = settings;
    this.updatedAt = new Date();
  }

  public isExists(): boolean {
    return undefined !== this.id;
  }

  public setId(id: number): void {
    if (this.isExists()) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): number {
    if (undefined === this.id) {
      throw new Error('The ID already exists');
    }

    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getCardsCount(): number {
    return this.cardsCount;
  }

  public getActiveCardsCount(): number {
    return this.activeCardsCount;
  }

  public getTagsCount(): number {
    return this.tagsCount;
  }

  public getSettings(): DeckSettingsRaw {
    return this.settings;
  }

  public nextGenerateAt(): void {
    const date = new Date();
    date.setHours(date.getHours() + this.settings.recalculate.hours);

    this.generateAt = date;
  }

  public getGeneratedAt(): Date {
    return this.generateAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
