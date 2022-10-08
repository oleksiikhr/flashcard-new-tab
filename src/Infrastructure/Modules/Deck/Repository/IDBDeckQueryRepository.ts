import Deck from '../../../../Domain/Modules/Deck/Deck';
import DeckId from '../../../../Domain/Modules/Deck/DeckId';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckMemento, {
  DeckRaw,
} from '../../../../Domain/Modules/Deck/Service/DeckMemento';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';
import DeckQueryRepository from '../../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

export default class IDBDeckQueryRepository implements DeckQueryRepository {
  constructor(private memento: DeckMemento, private idb: IndexedDB) {}

  public async paginate(
    fromId: DeckId | undefined,
    limit: number,
  ): Promise<Deck[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.DECKS)
      .objectStore(StoreName.DECKS)
      .openCursor(
        undefined !== fromId
          ? IDBKeyRange.lowerBound(fromId.getIdentifier())
          : null,
      );

    return this.idb
      .requestPaginate<DeckRaw>(request, limit)
      .then((raws) => raws.map((raw) => this.memento.unserialize(raw)));
  }

  public async findById(id: DeckId): Promise<Deck | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.DECKS)
      .objectStore(StoreName.DECKS)
      .get(id.getIdentifier());

    return this.idb
      .requestPromise<DeckRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined,
      );
  }

  public async findGenerateAtUpperByNow(count: number): Promise<Deck[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.DECKS)
      .objectStore(StoreName.DECKS)
      .index('generate_at_idx')
      .getAll(IDBKeyRange.upperBound(new Date()), count);

    return this.idb
      .requestPromise<DeckRaw[]>(request)
      .then((raws) =>
        (raws as DeckRaw[]).map((raw) => this.memento.unserialize(raw)),
      );
  }
}