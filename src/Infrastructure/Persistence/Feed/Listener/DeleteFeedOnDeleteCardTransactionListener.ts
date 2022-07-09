import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import CardDeleteTransactionEvent from '../../Card/Event/CardDeleteTransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteFeedOnDeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

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
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.FEED);
    const request = store.delete(card.getId().getIdentifier());

    return this.idb.requestPromise(request);
  }
}
