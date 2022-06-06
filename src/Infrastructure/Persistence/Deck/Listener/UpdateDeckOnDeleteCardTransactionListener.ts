import CardDeleteTransactionEvent from '../../Card/Event/CardDeleteTransactionEvent';
import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class UpdateDeckOnDeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
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
    event: CardDeleteTransactionEvent,
  ): Promise<unknown>[] {
    const raw = this.memento.serialize(event.getCard().getDeck());
    raw.cards_count -= 1;

    return [requestPromise(transaction.objectStore(StoreName.DECKS).put(raw))];
  }
}
