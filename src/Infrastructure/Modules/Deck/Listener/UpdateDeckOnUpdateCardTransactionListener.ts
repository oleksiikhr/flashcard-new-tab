import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DomainNotExistsError from '../../../../Domain/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Modules/Deck/Service/DeckMemento';
import CardUpdateTransactionEvent from '../../Card/Event/CardUpdateTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class UpdateDeckOnUpdateCardTransactionListener
  implements TransactionListener<CardUpdateTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(event: CardUpdateTransactionEvent): boolean {
    return event.getCard().isChangedActive();
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardUpdateTransactionEvent,
  ): Promise<unknown> {
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.get(card.getDeckId().getIdentifier());
    const raw = await this.idb.requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(card.getId());
    }

    if (card.isChangedActive()) {
      raw.active_cards_count += card.getIsActive() ? 1 : -1;
    }

    return this.idb.requestPromise(store.put(raw));
  }
}
