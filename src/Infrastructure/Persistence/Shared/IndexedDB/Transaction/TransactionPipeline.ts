import TransactionEvent from './TransactionEvent';
import TransactionListener from './TransactionListener';
import IndexedDB from '../IndexedDB';
import { toArray } from '../../../../../Domain/Shared/Util/type';
import Logger from '../../../../../Domain/Shared/Service/Logger';

export default class TransactionPipeline {
  private listeners = new Map<
    string,
    TransactionListener<TransactionEvent>[]
  >();

  constructor(private idb: IndexedDB, private logger: Logger) {}

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
    const storeNames: Set<string> = new Set();
    const listeners = (this.listeners.get(event.constructor.name) || []).filter(
      (listener) => {
        const isNeedHandle = listener.isNeedHandle(event);
        if (isNeedHandle) {
          storeNames.add(listener.getStoreName(event));
        }

        return isNeedHandle;
      },
    );

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
