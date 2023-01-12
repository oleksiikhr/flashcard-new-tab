import { toArray } from '../../util/type';
import { TransactionEvent, TransactionListener } from './transaction';

export const transactionPipeline = async <T extends TransactionEvent>(
  db: IDBDatabase,
  event: T,
  listeners: TransactionListener<T>[],
): Promise<void> => {
  const storeNames: Set<string> = new Set();

  const transaction = db.transaction(storeNames, 'readwrite');
  const promises: Promise<unknown>[] = [];

  try {
    listeners.forEach((listener) => {
      const result = listener.invoke(transaction, event);

      promises.push(...toArray(result));
    });
  } catch (err) {
    transaction.abort();

    Promise.all(promises).catch(() => {
      /* nothing */
    });

    return Promise.reject(err);
  }

  return Promise.all(promises)
    .then(() => transaction.commit())
    .catch((err) => {
      transaction.abort();

      throw err;
    });
};
