import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestKeyCursor } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';

export default class DeleteTagsOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store
      .index('deck_id_idx')
      .openKeyCursor(event.getDeck().getId().getIdentifier());

    return requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });
  }
}
