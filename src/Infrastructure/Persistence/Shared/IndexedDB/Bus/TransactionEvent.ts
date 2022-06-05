import TransactionAction from './TransactionAction';
import StoreName from '../StoreName';

export default interface TransactionEvent {
  getStoreName(): StoreName;

  getAction(): TransactionAction;
}
