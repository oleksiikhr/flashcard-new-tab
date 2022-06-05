import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardCreateTransactionEvent from '../../Card/Event/CardCreateTransactionEvent';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';

export default class UpdateDeckOnCreateCardTransactionListener
  implements TransactionListener<CardCreateTransactionEvent>
{
  constructor(private memento: DeckMemento) {}

  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardCreateTransactionEvent,
  ): Promise<unknown>[] {
    const raw = this.memento.serialize(event.getCard().getDeck());
    raw.cards_count += 1;

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.put(raw);

    return [requestPromise(request)];
  }
}
