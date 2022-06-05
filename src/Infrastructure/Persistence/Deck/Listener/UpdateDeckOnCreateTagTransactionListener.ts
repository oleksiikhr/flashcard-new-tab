import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import TagCreateTransactionEvent from '../../Tag/Event/TagCreateTransactionEvent';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class UpdateDeckOnCreateTagTransactionListener
  implements TransactionListener<TagCreateTransactionEvent>
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
    event: TagCreateTransactionEvent,
  ): Promise<unknown>[] {
    const deck = event.getTag().getDeck();
    const raw = this.memento.serialize(deck);

    raw.tags_count += 1;

    return [requestPromise(transaction.objectStore(StoreName.DECKS).put(raw))];
  }
}
