import TagId from './TagId';
import TagName from './TagName';
import Deck from '../Deck/Deck';

export default class Tag {
  constructor(
    private id: TagId | undefined,
    private deck: Deck | undefined,
    private name: TagName,
    private cardsCount: number,
    private isActive: boolean,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(deck: Deck, name: TagName, isActive: boolean): Tag {
    return new Tag(undefined, deck, name, 0, isActive, new Date(), new Date());
  }

  public from(name: TagName, isActive: boolean): void {
    this.name = name;
    this.isActive = isActive;
    this.updatedAt = new Date();
  }

  public setId(id: TagId): void {
    if (undefined !== this.id) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): TagId | undefined {
    return this.id;
  }

  public getDeck(): Deck | undefined {
    return this.deck;
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
