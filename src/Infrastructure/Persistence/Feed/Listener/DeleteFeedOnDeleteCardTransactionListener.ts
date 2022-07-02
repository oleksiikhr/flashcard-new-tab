import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import CardDeleteTransactionEvent from '../../Card/Event/CardDeleteTransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteFeedOnDeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.FEED;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardDeleteTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.FEED);
    const request = store.delete(card.getId().getIdentifier());

    return this.idb.requestPromise(request).finally(() => {
      this.logger.debug(
        'TransactionListener',
        this.constructor.name,
        'complete',
        { event, performance: performance.now() - time },
      );
    });
  }
}
