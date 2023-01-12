import { StoreName } from './constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransactionEvent {}

export interface TransactionListener<T> {
  storeName(event: T): StoreName;

  invoke(transaction: IDBTransaction, event: T): Promise<unknown>;
}
