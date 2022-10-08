import IDBTagCommandRepository from '../../../../Infrastructure/Modules/Tag/Repository/IDBTagCommandRepository';
import { transactionPipeline } from '../../../../Infrastructure/Persistence/IndexedDB';

const tagCommandRepository = new IDBTagCommandRepository(transactionPipeline);

export { tagCommandRepository };
