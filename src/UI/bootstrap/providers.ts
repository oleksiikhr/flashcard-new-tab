import make from './services';
import IDBTransactionProvider from '../../Infrastructure/Provider/IDBTransactionProvider';
import TransactionPipeline from '../../Infrastructure/Persistence/Shared/IndexedDB/TransactionPipeline';

export default () => {
  new IDBTransactionProvider(make(TransactionPipeline)).invoke();
};
