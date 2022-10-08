import IndexedDB from './IndexedDB';
import list from './Migration/list';
import { logger } from '../../../Domain/Adapter/logger';
import TransactionPipeline from './Transaction/TransactionPipeline';

const idb = new IndexedDB('flashcard-new-tab', list, logger);

const transactionPipeline = new TransactionPipeline(idb, logger);

export { idb, transactionPipeline };
