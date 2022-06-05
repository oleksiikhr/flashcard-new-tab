import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import TagDeleteTransactionEvent from '../../Tag/Event/TagDeleteTransactionEvent';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class UpdateDeckOnTagDeleteTransactionListener
  implements TransactionListener<TagDeleteTransactionEvent>
{
  constructor(private memento: DeckMemento) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName() {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagDeleteTransactionEvent,
  ): Promise<unknown>[] {
    const deck = event.getTag().getDeck();
    const raw = this.memento.serialize(deck);

    raw.tags_count -= 1;

    return [requestPromise(transaction.objectStore(StoreName.DECKS).put(raw))];
  }
}
