import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import TagQueryRepository from '../../../../Domain/Tag/Repository/TagQueryRepository';
import TagMemento, { TagRaw } from '../../../../Domain/Tag/TagMemento';
import TagId from '../../../../Domain/Tag/TagId';
import Tag from '../../../../Domain/Tag/Tag';
import DeckId from '../../../../Domain/Deck/DeckId';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class IDBTagQueryRepository implements TagQueryRepository {
  constructor(private memento: TagMemento, private idb: IndexedDB) {}

  async findById(id: TagId): Promise<Tag | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS)
      .get(id.getIdentifier());

    return this.idb
      .request<TagRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined,
      );
  }

  async findByIds(ids: TagId[]): Promise<Tag[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS);

    const promises = ids.map((id) =>
      this.idb
        .request<TagRaw>(request.get(id.getIdentifier()))
        .then((raw) =>
          undefined !== raw ? this.memento.unserialize(raw) : undefined,
        ),
    );

    const tags = await Promise.all<Tag | undefined>(promises);
    const filtered: Tag[] = [];

    tags.forEach((tag) => {
      if (undefined !== tag) {
        filtered.push(tag);
      }
    });

    return filtered;
  }

  async findActiveByDeckId(deckId: DeckId): Promise<Tag[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS)
      .index('deck_id_and_is_active')
      .getAll([deckId.getIdentifier(), 1]);

    return this.idb
      .request<TagRaw[]>(request)
      .then((raws) =>
        Promise.all(
          (raws as TagRaw[]).map((raw) => this.memento.unserialize(raw)),
        ),
      );
  }
}
