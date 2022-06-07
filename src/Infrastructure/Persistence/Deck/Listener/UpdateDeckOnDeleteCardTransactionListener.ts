import CardDeleteTransactionEvent from '../../Card/Event/CardDeleteTransactionEvent';
import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';

export default class UpdateDeckOnDeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardDeleteTransactionEvent,
  ): Promise<unknown> {
    const request = transaction
      .objectStore(StoreName.DECKS)
      .get(event.getCard().getDeckId().getIdentifier());

    const raw = await requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError();
    }

    raw.cards_count -= 1;

    return requestPromise(transaction.objectStore(StoreName.DECKS).put(raw));
  }
}
