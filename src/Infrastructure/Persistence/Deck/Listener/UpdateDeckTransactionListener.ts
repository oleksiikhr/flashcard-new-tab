import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import DeckUpdateTransactionEvent from '../Event/DeckUpdateTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class UpdateDeckTransactionListener
  implements TransactionListener<DeckUpdateTransactionEvent>
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
    event: DeckUpdateTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const deck = event.getDeck();
    const raw = this.memento.serialize(deck);

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.put(raw);

    return this.idb.requestPromise<number>(request).finally(() => {
      this.logger.debug(
        'TransactionListener',
        this.constructor.name,
        'complete',
        { event, performance: performance.now() - time },
      );
    });
  }
}
