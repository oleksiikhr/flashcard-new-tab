import StoreName from '../StoreName';

export default interface TransactionEvent {
  getStoreName(): StoreName;
}
