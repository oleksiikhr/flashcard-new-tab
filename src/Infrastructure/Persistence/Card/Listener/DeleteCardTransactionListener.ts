import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardDeleteTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const cardId = event.getCard().getId().getIdentifier();
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(cardId);

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
