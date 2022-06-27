import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
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
  ): Promise<unknown> {
    const cardId = event.getCard().getId().getIdentifier();
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(cardId);

    return requestPromise(request);
  }
}
