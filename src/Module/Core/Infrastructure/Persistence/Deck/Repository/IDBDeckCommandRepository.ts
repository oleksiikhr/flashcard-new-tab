import Deck from '../../../../Domain/Deck/Deck';
import IndexedDB from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/IndexedDB';
import DeckCommandRepository from '../../../../Domain/Deck/Repository/DeckCommandRepository';
import DomainAlreadyExistsError from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/Error/DomainAlreadyExistsError';
import DeckId from '../../../../Domain/Deck/DeckId';
import DeckMemento from '../../../../Domain/Deck/Service/DeckMemento';

export default class IDBDeckCommandRepository implements DeckCommandRepository {
  constructor(private memento: DeckMemento, private idb: IndexedDB) {}

  public async create(deck: Deck): Promise<void> {
    const raw = this.memento.serialize(deck);

    if (undefined !== raw.id) {
      throw new DomainAlreadyExistsError();
    }

    const db = await this.idb.connection();
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
    const db = await this.idb.connection();

    const request = db
      .transaction('decks', 'readwrite')
      .objectStore('decks')
      .put(raw);

    await this.idb.request(request);
  }
}
