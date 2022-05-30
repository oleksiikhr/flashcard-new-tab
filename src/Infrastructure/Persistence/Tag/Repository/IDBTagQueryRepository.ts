import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import TagQueryRepository from '../../../../Domain/Tag/Repository/TagQueryRepository';
import TagMemento, { TagRaw } from '../../../../Domain/Tag/Service/TagMemento';
import TagId from '../../../../Domain/Tag/TagId';
import Tag from '../../../../Domain/Tag/Tag';
import DeckId from '../../../../Domain/Deck/DeckId';

export default class IDBTagQueryRepository implements TagQueryRepository {
  constructor(private memento: TagMemento, private idb: IndexedDB) {}

  async findById(id: TagId): Promise<Tag | undefined> {
    const db = await this.idb.database();

    const request = db
      .transaction('tags')
      .objectStore('tags')
      .get(id.getIdentifier());

    return this.idb
      .request<TagRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined
      );
  }

  async findActiveByDeckId(deckId: DeckId): Promise<Tag[]> {
    const db = await this.idb.database();

    const request = db
      .transaction('tags')
      .objectStore('tags')
      .index('deck_id_and_is_active')
      .getAll([deckId.getIdentifier(), 1]);

    return this.idb
      .request<TagRaw[]>(request)
      .then((raws) =>
        Promise.all(
          (raws as TagRaw[]).map((raw) => this.memento.unserialize(raw))
        )
      );
  }
}
