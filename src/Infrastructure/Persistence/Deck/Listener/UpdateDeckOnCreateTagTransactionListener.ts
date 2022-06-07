import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import TagCreateTransactionEvent from '../../Tag/Event/TagCreateTransactionEvent';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';

export default class UpdateDeckOnCreateTagTransactionListener
  implements TransactionListener<TagCreateTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: TagCreateTransactionEvent,
  ): Promise<unknown> {
    const request = transaction
      .objectStore(StoreName.DECKS)
      .get(event.getTag().getDeckId().getIdentifier());

    const raw = await requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError();
    }

    raw.tags_count += 1;

    return requestPromise(transaction.objectStore(StoreName.DECKS).put(raw));
  }
}
