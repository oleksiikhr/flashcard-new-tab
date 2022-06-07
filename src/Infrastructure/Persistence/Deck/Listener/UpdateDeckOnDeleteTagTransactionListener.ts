import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import TagDeleteTransactionEvent from '../../Tag/Event/TagDeleteTransactionEvent';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';

export default class UpdateDeckOnDeleteTagTransactionListener
  implements TransactionListener<TagDeleteTransactionEvent>
{
  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName() {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: TagDeleteTransactionEvent,
  ): Promise<unknown> {
    const request = transaction
      .objectStore(StoreName.DECKS)
      .get(event.getTag().getDeckId().getIdentifier());

    const raw = await requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError();
    }

    raw.tags_count -= 1;

    return requestPromise(transaction.objectStore(StoreName.DECKS).put(raw));
  }
}
