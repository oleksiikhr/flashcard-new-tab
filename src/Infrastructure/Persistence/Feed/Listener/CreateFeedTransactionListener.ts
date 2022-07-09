import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import FeedCreateTransactionEvent from '../Event/FeedCreateTransactionEvent';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class CreateFeedTransactionListener
  implements TransactionListener<FeedCreateTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.FEED;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: FeedCreateTransactionEvent,
  ): Promise<unknown> {
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.FEED);
    const request = store.add({
      card_id: card.getId().getIdentifier(),
      deck_id: card.getDeckId().getIdentifier(),
    });

    return this.idb.requestPromise(request);
  }
}
