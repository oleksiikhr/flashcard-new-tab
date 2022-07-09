import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardCreateTransactionEvent from '../../Card/Event/CardCreateTransactionEvent';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class UpdateDeckOnCreateCardTransactionListener
  implements TransactionListener<CardCreateTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardCreateTransactionEvent,
  ): Promise<unknown> {
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.get(card.getDeckId().getIdentifier());
    const raw = await this.idb.requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(card.getId());
    }

    raw.cards_count += 1;

    if (card.getIsActive()) {
      raw.active_cards_count += 1;
    }

    return this.idb.requestPromise(store.put(raw));
  }
}
