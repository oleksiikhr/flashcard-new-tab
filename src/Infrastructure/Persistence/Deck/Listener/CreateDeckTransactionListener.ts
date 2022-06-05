import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckCreateTransactionEvent from '../Event/DeckCreateTransactionEvent';
import DeckMemento from '../../../../Domain/Deck/DeckMemento';
import DeckId from '../../../../Domain/Deck/DeckId';

export default class CreateDeckTransactionListener
  implements TransactionListener<DeckCreateTransactionEvent>
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
    event: DeckCreateTransactionEvent,
  ): Promise<unknown>[] {
    const deck = event.getDeck();
    const raw = this.memento.serialize(deck);
    delete raw.id;

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.add(raw);

    return [
      requestPromise<number>(request).then((id) => {
        deck.setId(DeckId.of(id as number));
      }),
    ];
  }
}
