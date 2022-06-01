import Deck from '../../../../Domain/Deck/Deck';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import DeckCommandRepository from '../../../../Domain/Deck/Repository/DeckCommandRepository';
import DeckId from '../../../../Domain/Deck/DeckId';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';

export default class IDBDeckCommandRepository implements DeckCommandRepository {
  constructor(private memento: DeckMemento, private idb: IndexedDB) {}

  public async create(deck: Deck): Promise<void> {
    const raw = this.memento.serialize(deck);
    const db = await this.idb.database();
    delete raw.id;

    const request = db
      .transaction('decks', 'readwrite')
      .objectStore('decks')
      .add(raw);

    await this.idb.request<number>(request).then((id) => {
      deck.setId(DeckId.of(id as number));
    });
  }

  public async update(deck: Deck): Promise<void> {
    const raw = this.memento.serialize(deck);
    const db = await this.idb.database();

    const request = db
      .transaction('decks', 'readwrite')
      .objectStore('decks')
      .put(raw);

    await this.idb.request(request);
  }

  public async delete(id: DeckId): Promise<void> {
    const db = await this.idb.database();

    const request = db
      .transaction('decks', 'readwrite')
      .objectStore('decks')
      .delete(id.getIdentifier());

    // TODO relations? (tags/cards)

    await this.idb.request(request);
  }
}
