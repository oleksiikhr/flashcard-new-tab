import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardCreateTransactionEvent from '../Event/CardCreateTransactionEvent';
import CardMemento from '../../../../Domain/Card/CardMemento';

export default class CreateCardTransactionListener
  implements TransactionListener<CardCreateTransactionEvent>
{
  constructor(private memento: CardMemento) {}

  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardCreateTransactionEvent,
  ): Promise<unknown>[] {
    const raw = this.memento.serialize(event.getCard());
    delete raw.id;

    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.add(raw);

    return [requestPromise(request)];
  }
}
