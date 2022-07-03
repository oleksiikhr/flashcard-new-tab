import StoreName from '../StoreName';

export default interface TransactionListener<T> {
  isNeedHandle(event: T): boolean;

  getStoreName(event: T): StoreName;

  invoke(transaction: IDBTransaction, event: T): Promise<unknown>;
}
