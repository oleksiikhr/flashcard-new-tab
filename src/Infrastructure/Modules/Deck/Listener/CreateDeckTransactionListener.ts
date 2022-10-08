import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckCreateTransactionEvent from '../Event/DeckCreateTransactionEvent';
import DeckMemento from '../../../../Domain/Modules/Deck/Service/DeckMemento';
import DeckId from '../../../../Domain/Modules/Deck/DeckId';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class CreateDeckTransactionListener
  implements TransactionListener<DeckCreateTransactionEvent>
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
    event: DeckCreateTransactionEvent,
  ): Promise<unknown> {
    const deck = event.getDeck();
    const raw = this.memento.serialize(deck);
    delete raw.id;

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.add(raw);

    return this.idb.requestPromise<number>(request).then((id) => {
      deck.setId(DeckId.of(id as number));
    });
  }
}
