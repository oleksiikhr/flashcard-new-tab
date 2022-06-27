import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import DeckUpdateTransactionEvent from '../Event/DeckUpdateTransactionEvent';

export default class UpdateDeckTransactionListener
  implements TransactionListener<DeckUpdateTransactionEvent>
{
  constructor(private memento: DeckMemento) {}

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

    return requestPromise<number>(request);
  }
}
