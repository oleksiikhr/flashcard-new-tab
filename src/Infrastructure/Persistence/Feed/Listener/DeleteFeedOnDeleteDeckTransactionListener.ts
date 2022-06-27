import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestKeyCursor } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';

export default class DeleteFeedOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.FEED;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
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
