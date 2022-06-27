import TransactionEvent from './TransactionEvent';
import TransactionListener from './TransactionListener';
import IndexedDB from '../IndexedDB';
import { toArray } from '../../../../../Domain/Shared/Util/type';

export default class TransactionPipeline {
  private listeners = new Map<
    string,
    TransactionListener<TransactionEvent>[]
  >();

  constructor(private idb: IndexedDB) {}

  public subscribe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: { new (...args: any[]): TransactionEvent },
    listeners: TransactionListener<TransactionEvent>[],
  ) {
    const state = this.listeners.get(event.name) || [];

    state.push(...listeners);

    this.listeners.set(event.name, listeners);
  }

  public async trigger(event: TransactionEvent): Promise<void> {
    const listeners = this.listeners.get(event.constructor.name) || [];
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
