import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import CardSyncTagsTransactionEvent from '../Event/CardSyncTagsTransactionEvent';
import { CardTagRaw } from '../../../../Domain/Card/CardMemento';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class SyncCardToTagsTransactionListener
  implements TransactionListener<CardSyncTagsTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARD_TAG;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardSyncTagsTransactionEvent,
  ): Promise<unknown> {
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.CARD_TAG);

    const request = store
      .index('card_id_idx')
      .openKeyCursor(card.getId().getIdentifier());

    await this.idb.requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });

    return Promise.all(
      event.getTags().map((tag) =>
        store.add({
          card_id: card.getId().getIdentifier(),
          deck_id: card.getDeckId().getIdentifier(),
          tag_id: tag.getId().getIdentifier(),
        } as CardTagRaw),
      ),
    );
  }
}
