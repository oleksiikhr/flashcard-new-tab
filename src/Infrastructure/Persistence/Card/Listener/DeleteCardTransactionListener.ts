import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';

export default class DeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardDeleteTransactionEvent,
  ): Promise<unknown>[] {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(event.getCard().getId().getIdentifier());

    return [requestPromise(request)];
  }
}
