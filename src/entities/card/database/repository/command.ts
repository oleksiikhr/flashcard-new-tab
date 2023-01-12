import {TransactionListener} from "../../../../shared/database/indexedDB/transaction";
import {Card, serializeCard} from "../../model/card";
import {StoreName} from "../../../../shared/database/indexedDB/constants";
import {requestPromise} from "../../../../shared/database/indexedDB/idb";
import {useConnection} from "../../../../shared/database/indexedDB/useConnection";
import {transactionPipeline} from "../../../../shared/database/indexedDB/transactionPipeline";

const createCardTransactionListener: TransactionListener<Card> = {
  storeName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.add(serializeCard(card));

    return requestPromise(request);
  },
}

export const createCardQuery = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [
    createCardTransactionListener,
  ]);
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
}

export const updateCardQuery = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [
    updateCardTransactionListener,
  ]);
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
}

export const deleteCardQuery = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [
    deleteCardTransactionListener,
  ]);
};
