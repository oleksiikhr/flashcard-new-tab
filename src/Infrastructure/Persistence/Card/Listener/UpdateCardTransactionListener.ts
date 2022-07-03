import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardUpdateTransactionEvent from '../Event/CardUpdateTransactionEvent';
import CardMemento from '../../../../Domain/Card/CardMemento';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class UpdateCardTransactionListener
  implements TransactionListener<CardUpdateTransactionEvent>
{
  constructor(
    private idb: IndexedDB,
    private logger: Logger,
    private memento: CardMemento,
  ) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardUpdateTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.put(this.memento.serialize(event.getCard()));

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
