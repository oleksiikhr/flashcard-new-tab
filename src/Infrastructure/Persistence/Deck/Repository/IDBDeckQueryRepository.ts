import DeckQueryRepository from '../../../../Domain/Deck/Repository/DeckQueryRepository';
import Deck from '../../../../Domain/Deck/Deck';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import DeckMemento, {
  DeckRaw,
} from '../../../../Domain/Deck/Service/DeckMemento';
import DeckId from '../../../../Domain/Deck/DeckId';

export default class IDBDeckQueryRepository implements DeckQueryRepository {
  constructor(private memento: DeckMemento, private idb: IndexedDB) {}

  async findById(id: DeckId): Promise<Deck | undefined> {
    const db = await this.idb.database();

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

  async findGenerateAtUpperByNow(count: number): Promise<Deck[]> {
    const db = await this.idb.database();

    const request = db
      .transaction('decks')
      .objectStore('decks')
      .index('generate_at')
      .getAll(IDBKeyRange.upperBound(new Date()), count);

    return this.idb.request<DeckRaw[]>(request).then((raws) => {
      const decks: Deck[] = [];

      (raws as DeckRaw[]).forEach((raw) => {
        decks.push(this.memento.unserialize(raw));
      });

      return decks;
    });
  }
}
