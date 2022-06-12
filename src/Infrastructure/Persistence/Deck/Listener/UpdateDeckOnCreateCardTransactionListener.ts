import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardCreateTransactionEvent from '../../Card/Event/CardCreateTransactionEvent';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';

export default class UpdateDeckOnCreateCardTransactionListener
  implements TransactionListener<CardCreateTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardCreateTransactionEvent,
  ): Promise<unknown> {
    const request = transaction
      .objectStore(StoreName.DECKS)
      .get(event.getCard().getDeckId().getIdentifier());

    const raw = await requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError();
    }

    raw.cards_count += 1;

    if (event.getCard().getIsActive()) {
      raw.active_cards_count += 1;
    }

    return requestPromise(transaction.objectStore(StoreName.DECKS).put(raw));
  }
}
