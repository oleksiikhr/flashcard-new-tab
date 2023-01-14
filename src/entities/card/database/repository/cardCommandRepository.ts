import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import {
  Card,
  CardSerialized,
  serializeCard,
  unserializeCard,
  updateCardModel,
} from '../../model/card';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import {
  requestCursor,
  requestPromise,
} from '../../../../shared/database/indexedDB/idb';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';

const createCardTransactionListener: TransactionListener<Card> = {
  storeName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.add(serializeCard(card));

    return requestPromise(request);
  },
};

export const createCardRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [createCardTransactionListener]);
};

const updateCardTransactionListener: TransactionListener<Card> = {
  storeName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.put(serializeCard(card));

    return requestPromise(request);
  },
};

export const updateCardRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [updateCardTransactionListener]);
};

const deleteCardTransactionListener: TransactionListener<Card> = {
  storeName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(card.id);

    return requestPromise(request);
  },
};

export const deleteCardRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [deleteCardTransactionListener]);
};

export const clearFeedCardsRequest = async (): Promise<void> => {
  const conn = await useConnection();

  const store = conn
    .transaction(StoreName.CARDS, 'readwrite')
    .objectStore(StoreName.CARDS);

  const request = store.index('is_feed_idx').openCursor(IDBKeyRange.only(1));

  return requestCursor(request, (cursor) => {
    const card = unserializeCard(cursor.value as CardSerialized);

    updateCardModel(card, {
      isFeed: false,
    });

    store.put(serializeCard(card));

    cursor.continue();
  });
};
