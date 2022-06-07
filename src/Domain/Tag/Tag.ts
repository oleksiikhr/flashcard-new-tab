import TagId from './TagId';
import TagName from './TagName';
import DeckId from '../Deck/DeckId';

export default class Tag {
  constructor(
    private id: TagId | undefined,
    private deckId: DeckId,
    private name: TagName,
    private cardsCount: number,
    private isActive: boolean,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(deckId: DeckId, name: TagName, isActive: boolean): Tag {
    return new Tag(
      undefined,
      deckId,
      name,
      0,
      isActive,
      new Date(),
      new Date(),
    );
  }

  public from(name: TagName, isActive: boolean): void {
    this.name = name;
    this.isActive = isActive;
    this.updatedAt = new Date();
  }

  public isExists(): boolean {
    return undefined !== this.id;
  }

  public setId(id: TagId): void {
    if (this.isExists()) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): TagId {
    if (undefined === this.id) {
      throw new Error(''); // TODO
    }

    return this.id;
  }

  public getDeckId(): DeckId {
    return this.deckId;
  }

  public getName(): TagName {
    return this.name;
  }

  public getCardsCount(): number {
    return this.cardsCount;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
