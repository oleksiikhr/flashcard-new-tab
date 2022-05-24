import Card from '../../../../Domain/Card/Card';
import IndexedDB from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/IndexedDB';
import { CardCommandRepository } from '../../../../Domain/Card/Repository/CardCommandRepository';
import DomainAlreadyExistsError from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/Error/DomainAlreadyExistsError';
import CardId from '../../../../Domain/Card/CardId';
import CardMemento from '../../../../Domain/Card/Service/CardMemento';
import DeckMemento from '../../../../Domain/Deck/Service/DeckMemento';
import DomainDoesNotExistsError from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/Error/DomainDoesNotExistsError';

export default class IDBCardCommandRepository implements CardCommandRepository {
  constructor(
    private deckMemento: DeckMemento,
    private cardMemento: CardMemento,
    private idb: IndexedDB
  ) {}

  async create(card: Card): Promise<void> {
    const deck = card.getDeck();

    if (undefined === deck) {
      throw new DomainDoesNotExistsError();
    }

    const cardRaw = this.cardMemento.serialize(card);
    const deckRaw = this.deckMemento.serialize(deck);

    if (undefined !== cardRaw.id) {
      throw new DomainAlreadyExistsError();
    }

    const db = await this.idb.connection();
    delete cardRaw.id;

    const transaction = db.transaction(['cards', 'decks'], 'readwrite');
    const cardRequest = transaction.objectStore('cards').add(cardRaw);
    const deckRequest = transaction.objectStore('decks').put(deckRaw);

    await Promise.all([
      this.idb
        .request<number>(cardRequest)
        .then((id) => card.setId(CardId.of(id as number))),
      this.idb.request(deckRequest),
    ]);
  }

  async update(card: Card): Promise<void> {
    const raw = this.cardMemento.serialize(card);
    const db = await this.idb.connection();

    const request = db
      .transaction('cards', 'readwrite')
      .objectStore('cards')
      .put(raw);

    await this.idb.request(request);
  }
}
