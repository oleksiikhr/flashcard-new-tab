import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import CardDeleteTransactionEvent from '../../Card/Event/CardDeleteTransactionEvent';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class DeleteFeedOnDeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.FEED;
  }

  public invoke(
    transaction: IDBTransaction,
    event: CardDeleteTransactionEvent,
  ): Promise<unknown>[] {
    const card = event.getCard();

    const request = transaction
      .objectStore(StoreName.FEED)
      .delete(card.getId().getIdentifier());

    return [requestPromise(request)];
  }
}
