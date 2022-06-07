import DeckQueryRepository from '../../../../Domain/Deck/Repository/DeckQueryRepository';
import Deck from '../../../../Domain/Deck/Deck';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import DeckMemento, { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import DeckId from '../../../../Domain/Deck/DeckId';
import StoreName from '../../Shared/IndexedDB/StoreName';
import {
  requestPaginate,
  requestPromise,
} from '../../Shared/IndexedDB/Util/idb';

export default class IDBDeckQueryRepository implements DeckQueryRepository {
  constructor(private memento: DeckMemento, private idb: IndexedDB) {}

  async paginate(fromId: DeckId | undefined, limit: number): Promise<Deck[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.DECKS)
      .objectStore(StoreName.DECKS)
      .openCursor(
        undefined !== fromId
          ? IDBKeyRange.lowerBound(fromId.getIdentifier())
          : null,
      );

    return requestPaginate<DeckRaw>(request, limit).then((raws) =>
      raws.map((raw) => this.memento.unserialize(raw)),
    );
  }

  async findById(id: DeckId): Promise<Deck | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.DECKS)
      .objectStore(StoreName.DECKS)
      .get(id.getIdentifier());

    return requestPromise<DeckRaw>(request).then((raw) =>
      undefined !== raw ? this.memento.unserialize(raw) : undefined,
    );
  }

  async findGenerateAtUpperByNow(count: number): Promise<Deck[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.DECKS)
      .objectStore(StoreName.DECKS)
      .index('generate_at_idx')
      .getAll(IDBKeyRange.upperBound(new Date()), count);

    return requestPromise<DeckRaw[]>(request).then((raws) =>
      (raws as DeckRaw[]).map((raw) => this.memento.unserialize(raw)),
    );
  }
}
