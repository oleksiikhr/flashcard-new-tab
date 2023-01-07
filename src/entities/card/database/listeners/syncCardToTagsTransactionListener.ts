import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestKeyCursor } from '../../../../shared/database/indexedDB/idb';
import { Card, CardTag } from '../../model/card';
import { Tag } from '../../../tag/model/tag';

export const syncCardToTagsTransactionListener: TransactionListener<{
  card: Card;
  tags: Tag[];
}> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.CARD_TAG;
  },

  async invoke(
    transaction: IDBTransaction,
    { card, tags }: { card: Card; tags: Tag[] },
  ): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARD_TAG);
    const request = store.index('card_id_idx').openKeyCursor(card.id);

    await requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });

    return Promise.all(
      tags.map((tag) =>
        store.add({
          card_id: card.id,
          deck_id: card.deckId,
          tag_id: tag.id,
        } as CardTag),
      ),
    );
  },
};
