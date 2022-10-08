import TagId from './TagId';
import DeckId from '../Deck/DeckId';
import TagNameAndDeckIdMustBeUnique from './Rule/TagNameAndDeckIdMustBeUnique';
import AggregateRoot from '../../Aggregate/AggregateRoot';
import TagQueryRepository from './Repository/TagQueryRepository';

export default class Tag extends AggregateRoot {
  constructor(
    private id: TagId | undefined,
    private deckId: DeckId,
    private name: string,
    private updatedAt: Date,
    private createdAt: Date,
  ) {
    super();
  }

  public static async create(
    deckId: DeckId,
    name: string,
    tagQueryRepository: TagQueryRepository,
  ): Promise<Tag> {
    const tag = new Tag(undefined, deckId, name, new Date(), new Date());

    await tag.checkRule(
      new TagNameAndDeckIdMustBeUnique(tagQueryRepository, deckId, name),
    );

    return tag;
  }

  public async update(
    name: string,
    tagQueryRepository: TagQueryRepository,
  ): Promise<void> {
    if (this.name !== name) {
      await this.checkRule(
        new TagNameAndDeckIdMustBeUnique(tagQueryRepository, this.deckId, name),
      );
    }

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
      throw new Error('The ID already exists');
    }

    return this.id;
  }

  public getDeckId(): DeckId {
    return this.deckId;
  }

  public getName(): string {
    return this.name;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
