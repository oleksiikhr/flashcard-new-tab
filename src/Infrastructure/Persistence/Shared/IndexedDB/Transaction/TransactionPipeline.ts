import TransactionEvent from './TransactionEvent';
import TransactionListener from './TransactionListener';
import TransactionAction from './TransactionAction';
import IndexedDB from '../IndexedDB';
import StoreName from '../StoreName';
import { error } from '../../../../../Domain/Shared/Util/logger';
import { toArray } from '../../../../../Domain/Shared/Util/type';

export default class TransactionPipeline {
  private listeners = new Map<
    string,
    TransactionListener<TransactionEvent>[]
  >();

  constructor(private idb: IndexedDB) {}

  public subscribe(
    storeName: StoreName,
    action: TransactionAction,
    listeners: TransactionListener<TransactionEvent>[],
  ) {
    const state = this.listeners.get(storeName + action) || [];

    state.push(...listeners);

    this.listeners.set(storeName + action, listeners);
  }

  async trigger(event: TransactionEvent): Promise<void> {
    const listeners =
      this.listeners.get(event.getStoreName() + event.getAction()) || [];
    const storeNames: Set<string> = new Set();

    listeners
      .filter((listener) => listener.isNeedHandle(event))
      .forEach((listener) => {
        storeNames.add(listener.getStoreName(event));
      });

    const db = await this.idb.openDB();
    const transaction = db.transaction(storeNames, 'readwrite');
    const promises: Promise<unknown>[] = [];

    try {
      listeners.forEach((listener) => {
        const result = listener.invoke(transaction, event);

        promises.push(...toArray(result));
      });
    } catch (e) {
      transaction.abort();

      Promise.all(promises).catch(error);

      return Promise.reject(e);
    }

    return Promise.all(promises)
      .then(() => transaction.commit())
      .catch((e) => {
        transaction.abort();

        throw e;
      });
  }
}
