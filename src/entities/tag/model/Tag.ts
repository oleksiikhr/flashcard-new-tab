import { findTagByDeckIdAndNameRequest } from '../database/requests/findTagByDeckIdAndNameRequest';

export default class Tag {
  constructor(
    private id: number | undefined,
    private deckId: number,
    private name: string,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static async create(deckId: number, name: string): Promise<Tag> {
    const tag = new Tag(undefined, deckId, name, new Date(), new Date());

    if ((await findTagByDeckIdAndNameRequest(deckId, name)) !== null) {
      throw new Error('Tag name with this deck must be unique.');
    }

    return tag;
  }

  public async update(name: string): Promise<void> {
    if (
      name !== this.name &&
      (await findTagByDeckIdAndNameRequest(this.deckId, name)) !== null
    ) {
      throw new Error('Tag name with this deck must be unique.');
    }

    this.name = name;
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

  public getDeckId(): number {
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
