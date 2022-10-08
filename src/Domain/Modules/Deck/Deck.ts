import DeckId from './DeckId';
import DeckSettings from './ValueObject/DeckSettings';

export default class Deck {
  constructor(
    private id: DeckId | undefined,
    private name: string,
    private isActive: boolean,
    private cardsCount: number,
    private activeCardsCount: number,
    private tagsCount: number,
    private settings: DeckSettings,
    private generateAt: Date,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(
    name: string,
    isActive: boolean,
    settings: DeckSettings,
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

  public update(name: string, isActive: boolean, settings: DeckSettings): void {
    this.name = name;
    this.isActive = isActive;
    this.settings = settings;
    this.updatedAt = new Date();
  }

  public isExists(): boolean {
    return undefined !== this.id;
  }

  public setId(id: DeckId): void {
    if (this.isExists()) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): DeckId {
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

  public getSettings(): DeckSettings {
    return this.settings;
  }

  public nextGenerateAt(): void {
    const date = new Date();
    date.setHours(date.getHours() + this.getSettings().getRecalculate().hours);

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