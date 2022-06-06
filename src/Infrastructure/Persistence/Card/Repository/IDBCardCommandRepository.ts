import Card from '../../../../Domain/Card/Card';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import CardCommandRepository from '../../../../Domain/Card/Repository/CardCommandRepository';
import DomainAlreadyExistsError from '../../Shared/IndexedDB/Error/DomainAlreadyExistsError';
import CardId from '../../../../Domain/Card/CardId';
import CardMemento from '../../../../Domain/Card/CardMemento';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import DomainDoesNotExistsError from '../../Shared/IndexedDB/Error/DomainDoesNotExistsError';
import TransactionPipeline from '../../Shared/IndexedDB/TransactionPipeline';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class IDBCardCommandRepository implements CardCommandRepository {
  constructor(
    private pipeline: TransactionPipeline,
    private deckMemento: DeckMemento,
    private cardMemento: CardMemento,
    private idb: IndexedDB,
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

    const db = await this.idb.openDB();
    delete cardRaw.id;

    const transaction = db.transaction(
      [StoreName.CARDS, StoreName.DECKS],
      'readwrite',
    );
    const cardRequest = transaction.objectStore(StoreName.CARDS).add(cardRaw);
    const deckRequest = transaction.objectStore(StoreName.DECKS).put(deckRaw);

    await Promise.all([
      this.idb
        .request<number>(cardRequest)
        .then((id) => card.setId(CardId.of(id as number))),
      this.idb.request(deckRequest),
    ]);
  }

  async update(card: Card): Promise<void> {
    const raw = this.cardMemento.serialize(card);
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.CARDS, 'readwrite')
      .objectStore(StoreName.CARDS)
      .put(raw);

    await this.idb.request(request);
  }

  delete(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardDeleteTransactionEvent(card));
  }
}
