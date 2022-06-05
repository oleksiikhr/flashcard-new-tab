import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../Event/DeckDeleteTransactionEvent';

export default class DeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown>[] {
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.delete(event.getDeck().getId().getIdentifier());

    return [requestPromise(request)];
  }
}
