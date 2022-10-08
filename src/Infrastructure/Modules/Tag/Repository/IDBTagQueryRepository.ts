import Tag from '../../../../Domain/Modules/Tag/Tag';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';
import TagMemento, {
  TagRaw,
} from '../../../../Domain/Modules/Tag/Service/TagMemento';
import TagId from '../../../../Domain/Modules/Tag/TagId';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckId from '../../../../Domain/Modules/Deck/DeckId';
import TagQueryRepository from '../../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class IDBTagQueryRepository implements TagQueryRepository {
  constructor(private memento: TagMemento, private idb: IndexedDB) {}

  public async paginate(
    fromId: TagId | undefined,
    limit: number,
  ): Promise<Tag[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS)
      .openCursor(
        undefined !== fromId
          ? IDBKeyRange.lowerBound(fromId.getIdentifier())
          : null,
      );

    return this.idb
      .requestPaginate<TagRaw>(request, limit)
      .then((raws) => raws.map((raw) => this.memento.unserialize(raw)));
  }

  public async findById(id: TagId): Promise<Tag | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS)
      .get(id.getIdentifier());

    return this.idb
      .requestPromise<TagRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined,
      );
  }

  public async findByDeckIdAndName(
    deckId: DeckId,
    name: string,
  ): Promise<Tag | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS)
      .index('deck_id_and_name_idx')
      .get(IDBKeyRange.only([deckId.getIdentifier(), name]));

    return this.idb
      .requestPromise<TagRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined,
      );
  }

  public async findByIds(ids: TagId[]): Promise<Tag[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS);

    const promises = ids.map((id) =>
      this.idb
        .requestPromise<TagRaw>(request.get(id.getIdentifier()))
        .then((raw) =>
          undefined !== raw ? this.memento.unserialize(raw) : undefined,
        ),
    );

    const tags = await Promise.all<Tag | undefined>(promises);

    return tags.filter((tag) => undefined !== tag) as Tag[];
  }

  public async findActiveByDeckId(deckId: DeckId): Promise<Tag[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.TAGS, 'readonly')
      .objectStore(StoreName.TAGS)
      .index('deck_id_and_is_active_idx')
      .getAll([deckId.getIdentifier(), 1]);

    return this.idb
      .requestPromise<TagRaw[]>(request)
      .then((raws) =>
        (raws as TagRaw[]).map((raw) => this.memento.unserialize(raw)),
      );
  }
}
