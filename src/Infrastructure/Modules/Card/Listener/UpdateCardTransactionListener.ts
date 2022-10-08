import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import CardUpdateTransactionEvent from '../Event/CardUpdateTransactionEvent';
import CardMemento from '../../../../Domain/Modules/Card/Service/CardMemento';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class UpdateCardTransactionListener
  implements TransactionListener<CardUpdateTransactionEvent>
{
  constructor(private idb: IndexedDB, private memento: CardMemento) {}

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

    return this.idb.requestPromise(request);
  }
}