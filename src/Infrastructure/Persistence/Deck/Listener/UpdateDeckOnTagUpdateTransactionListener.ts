import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import TagUpdateTransactionEvent from '../../Tag/Event/TagUpdateTransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class UpdateDeckOnTagDeleteTransactionListener
  implements TransactionListener<TagUpdateTransactionEvent>
{
  constructor(private memento: DeckMemento) {}

  public isNeedHandle(): boolean {
    // TODO event.getTag().isChangedDeck
    return true;
  }

  public getStoreName() {
    return StoreName.DECKS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagUpdateTransactionEvent,
  ): Promise<unknown>[] {
    const newDeck = event.getTag().getDeck();
    const newRaw = this.memento.serialize(newDeck);
    newRaw.tags_count += 1;

    const oldDeck = event.getTag().getDeck(); // TODO getOldDeck()
    const oldRaw = this.memento.serialize(oldDeck);
    oldRaw.tags_count -= 1;

    return [
      requestPromise(transaction.objectStore('decks').put(newRaw)),
      requestPromise(transaction.objectStore('decks').put(oldRaw)),
    ];
  }
}
