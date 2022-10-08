import IDBTagCommandRepository from '../../../../Infrastructure/Modules/Tag/Repository/IDBTagCommandRepository';
import {
  idb,
  transactionPipeline,
} from '../../../../Infrastructure/Persistence/IndexedDB';
import { tagMemento } from './tagMemento';

const tagCommandRepository = new IDBTagCommandRepository(
  transactionPipeline,
  tagMemento,
  idb,
);

export { tagCommandRepository };
