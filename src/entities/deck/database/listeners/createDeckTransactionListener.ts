import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { serializeDeck } from '../../model/memento';
import Deck from '../../model/Deck';

export const createDeckTransactionListener: TransactionListener<Deck> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.DECKS;
  },

  invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
    const raw = serializeDeck(deck);
    delete raw.id;

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.add(raw);

    return requestPromise<number>(request).then((id) => {
      deck.setId(id as number);
    });
  },
};
