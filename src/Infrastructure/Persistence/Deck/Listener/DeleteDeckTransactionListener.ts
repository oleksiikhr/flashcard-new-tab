import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../Event/DeckDeleteTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const deckId = event.getDeck().getId().getIdentifier();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.delete(deckId);

    return this.idb.requestPromise(request).finally(() => {
      this.logger.debug(
        'TransactionListener',
        this.constructor.name,
        'complete',
        { event, performance: Math.floor(performance.now() - time) },
      );
    });
  }
}
