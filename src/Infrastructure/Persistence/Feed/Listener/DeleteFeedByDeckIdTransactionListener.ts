import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestKeyCursor } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import FeedDeleteByIdDeckTransactionEvent from '../Event/FeedDeleteByIdDeckTransactionEvent';

export default class DeleteFeedByDeckIdTransactionListener
  implements TransactionListener<FeedDeleteByIdDeckTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.FEED;
  }

  public invoke(
    transaction: IDBTransaction,
    event: FeedDeleteByIdDeckTransactionEvent,
  ): Promise<unknown> {
    const deck = event.getDeck();
    const store = transaction.objectStore(StoreName.FEED);
    const request = store
      .index('deck_id_idx')
      .openKeyCursor(deck.getId().getIdentifier());

    return requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });
  }
}
