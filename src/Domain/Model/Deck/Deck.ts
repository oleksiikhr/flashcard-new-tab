import DeckId from './DeckId';
import DeckName from './DeckName';
import DeckSettings from './DeckSettings';

export default class Deck {
  constructor(
    private id: DeckId | undefined,
    private name: DeckName,
    private isActive: boolean,
    private cardsCount: number,
    private labelsCount: number,
    private settings: DeckSettings,
    private updatedAt: Date,
    private createdAt: Date
  ) {}

  public static create(
    name: DeckName,
    isActive: boolean,
    settings: DeckSettings
  ): Deck {
    return new Deck(
      undefined,
      name,
      isActive,
      0,
      0,
      settings,
      new Date(),
      new Date()
    );
  }

  public from(name: DeckName, isActive: boolean, settings: DeckSettings): void {
    this.name = name;
    this.isActive = isActive;
    this.settings = settings;
    this.updatedAt = new Date();
  }

  public setId(id: DeckId): void {
    if (undefined !== this.id) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): DeckId | undefined {
    return this.id;
  }

  public getName(): DeckName {
    return this.name;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public incrementCardsCount(increment = 1): void {
    this.cardsCount += increment;

    this.updatedAt = new Date();
  }

  public getCardsCount(): number {
    return this.cardsCount;
  }

  public getLabelsCount(): number {
    return this.labelsCount;
  }

  public getSettings(): DeckSettings {
    return this.settings;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
