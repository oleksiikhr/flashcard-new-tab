import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardCreateTransactionEvent from '../Event/CardCreateTransactionEvent';
import CardMemento from '../../../../Domain/Card/CardMemento';
import CardId from '../../../../Domain/Card/CardId';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class CreateCardTransactionListener
  implements TransactionListener<CardCreateTransactionEvent>
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
    event: CardCreateTransactionEvent,
  ): Promise<unknown> {
    const card = event.getCard();
    const raw = this.memento.serialize(card);
    delete raw.id;

    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.add(raw);

    return this.idb.requestPromise<number>(request).then((id) => {
      card.setId(CardId.of(id as number));
    });
  }
}
