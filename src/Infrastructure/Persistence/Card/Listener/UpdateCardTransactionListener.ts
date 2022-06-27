import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardUpdateTransactionEvent from '../Event/CardUpdateTransactionEvent';
import CardMemento from '../../../../Domain/Card/CardMemento';

export default class UpdateCardTransactionListener
  implements TransactionListener<CardUpdateTransactionEvent>
{
  constructor(private memento: CardMemento) {}

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
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.put(this.memento.serialize(event.getCard()));

    return requestPromise(request);
  }
}
