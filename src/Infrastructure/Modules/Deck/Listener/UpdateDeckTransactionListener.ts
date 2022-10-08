import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckMemento from '../../../../Domain/Modules/Deck/Service/DeckMemento';
import DeckUpdateTransactionEvent from '../Event/DeckUpdateTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class UpdateDeckTransactionListener
  implements TransactionListener<DeckUpdateTransactionEvent>
{
  constructor(private idb: IndexedDB, private memento: DeckMemento) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckUpdateTransactionEvent,
  ): Promise<unknown> {
    const deck = event.getDeck();
    const raw = this.memento.serialize(deck);

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.put(raw);

    return this.idb.requestPromise<number>(request);
  }
}
