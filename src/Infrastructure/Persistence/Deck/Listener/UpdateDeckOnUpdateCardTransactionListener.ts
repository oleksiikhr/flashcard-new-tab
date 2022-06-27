import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import CardUpdateTransactionEvent from '../../Card/Event/CardUpdateTransactionEvent';

export default class UpdateDeckOnUpdateCardTransactionListener
  implements TransactionListener<CardUpdateTransactionEvent>
{
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
    const raw = await requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(card.getId());
    }

    if (card.getIsActive()) {
      raw.active_cards_count += 1;
    } else {
      raw.active_cards_count -= 1;
    }

    return requestPromise(store.put(raw));
  }
}
