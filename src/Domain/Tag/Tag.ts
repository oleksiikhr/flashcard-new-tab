import TagId from './TagId';
import TagName from './TagName';
import DeckId from '../Deck/DeckId';

export default class Tag {
  constructor(
    private id: TagId | undefined,
    private deckId: DeckId,
    private name: TagName,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(deckId: DeckId, name: TagName): Tag {
    return new Tag(undefined, deckId, name, new Date(), new Date());
  }

  public from(name: TagName): void {
    this.name = name;
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

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
