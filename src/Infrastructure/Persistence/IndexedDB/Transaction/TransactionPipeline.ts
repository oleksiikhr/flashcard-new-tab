import TransactionEvent from './TransactionEvent';
import TransactionListener from './TransactionListener';
import IndexedDB from '../IndexedDB';
import { toArray } from '../../../../Domain/Util/type';
import Logger from '../../../../Domain/Service/Logger';

export default class TransactionPipeline {
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public async trigger(
    event: TransactionEvent,
    transactionListeners: TransactionListener<TransactionEvent>[],
  ): Promise<void> {
    const storeNames: Set<string> = new Set();
    const listeners = transactionListeners.filter((listener) => {
      const isNeedHandle = listener.isNeedHandle(event);
      if (isNeedHandle) {
        storeNames.add(listener.getStoreName(event));
      }

      return isNeedHandle;
    });

    this.logger.debug('IndexedDB', 'TransactionPipeline', 'trigger', {
      storeNames,
      event,
      listeners,
    });

    const db = await this.idb.openDB();
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
  }
}
