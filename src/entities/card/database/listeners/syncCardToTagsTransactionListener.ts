import { CardTagRaw } from '../../model/memento';
import Card from '../../model/Card';
import Tag from '../../../tag/model/Tag';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestKeyCursor } from '../../../../shared/database/indexedDB/idb';

export const syncCardToTagsTransactionListener: TransactionListener<{
  card: Card;
  tags: Tag[];
}> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.CARD_TAG;
  },

  async invoke(
    transaction: IDBTransaction,
    { card, tags }: { card: Card; tags: Tag[] },
  ): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARD_TAG);

    const request = store.index('card_id_idx').openKeyCursor(card.getId());

    await requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });

    return Promise.all(
      tags.map((tag) =>
        store.add({
          card_id: card.getId(),
          deck_id: card.getDeckId(),
          tag_id: tag.getId(),
        } as CardTagRaw),
      ),
    );
  },
};
