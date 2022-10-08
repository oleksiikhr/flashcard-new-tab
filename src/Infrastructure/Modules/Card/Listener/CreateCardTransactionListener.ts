import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import CardCreateTransactionEvent from '../Event/CardCreateTransactionEvent';
import CardMemento from '../../../../Domain/Modules/Card/Service/CardMemento';
import CardId from '../../../../Domain/Modules/Card/CardId';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

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
