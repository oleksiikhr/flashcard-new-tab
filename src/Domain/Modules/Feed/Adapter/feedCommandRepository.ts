import IDBFeedCommandRepository from '../../../../Infrastructure/Modules/Feed/Repository/IDBFeedCommandRepository';
import { transactionPipeline } from '../../../../Infrastructure/Persistence/IndexedDB';

const feedCommandRepository = new IDBFeedCommandRepository(transactionPipeline);

export { feedCommandRepository };
