import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

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
    const cardId = event.getCard().getId().getIdentifier();
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(cardId);

    return this.idb.requestPromise(request);
  }
}
