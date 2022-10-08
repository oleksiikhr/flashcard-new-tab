import IDBTagQueryRepository from '../../../../Infrastructure/Modules/Tag/Repository/IDBTagQueryRepository';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';
import { tagMemento } from './tagMemento';

const tagQueryRepository = new IDBTagQueryRepository(tagMemento, idb);

export { tagQueryRepository };
