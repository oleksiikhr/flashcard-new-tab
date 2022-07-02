import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckCreateTransactionEvent from '../Event/DeckCreateTransactionEvent';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import DeckId from '../../../../Domain/Deck/DeckId';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class CreateDeckTransactionListener
  implements TransactionListener<DeckCreateTransactionEvent>
{
  constructor(
    private idb: IndexedDB,
    private logger: Logger,
    private memento: DeckMemento,
  ) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckCreateTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const deck = event.getDeck();
    const raw = this.memento.serialize(deck);
    delete raw.id;

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.add(raw);

    return this.idb
      .requestPromise<number>(request)
      .then((id) => {
        deck.setId(DeckId.of(id as number));
      })
      .finally(() => {
        this.logger.debug(
          'TransactionListener',
          this.constructor.name,
          'complete',
          { event, performance: Math.floor(performance.now() - time) },
        );
      });
  }
}
