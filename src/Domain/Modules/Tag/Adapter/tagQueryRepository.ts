import IDBTagQueryRepository from '../../../../Infrastructure/Modules/Tag/Repository/IDBTagQueryRepository';
import { tagMemento } from '../Service';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';

const tagQueryRepository = new IDBTagQueryRepository(tagMemento, idb);

export { tagQueryRepository };
