import DeckQueryRepository from '../../../../../Domain/Model/Deck/Repository/DeckQueryRepository';
import Deck from '../../../../../Domain/Model/Deck/Deck';
import IndexedDB from '../../../IndexedDB/IndexedDB';
import DeckMemento, {
  DeckRaw,
} from '../../../../../Domain/Model/Deck/Service/DeckMemento';
import DeckId from '../../../../../Domain/Model/Deck/DeckId';

export default class IDBDeckQueryRepository implements DeckQueryRepository {
  constructor(private memento: DeckMemento, private idb: IndexedDB) {}

  async findById(id: DeckId): Promise<Deck | undefined> {
    const db = await this.idb.connection();

    const request = db
      .transaction('decks')
      .objectStore('decks')
      .get(id.getIdentifier());

    return this.idb
      .request<DeckRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined
      );
  }

  // async findRandomActiveDeck() {
  //   const db = await this.idb.connection();
  //
  //   const request = db
  //     .transaction('decks')
  //     .objectStore('decks')
  //     .index('is_active');
  //
  //   const filter = IDBKeyRange.only(1);
  //
  //   console.time('total');
  //   // const total = await this.idb.request<number>(request.count(filter)) as number;
  //   const total = 166666;
  //   console.timeEnd('total');
  //
  //   console.time('result');
  //   const result = await this.idb.random(request.openCursor(filter), total);
  //   console.timeEnd('result');
  //
  //   console.log('request', result, total);
  //   return result;
  // }
}
