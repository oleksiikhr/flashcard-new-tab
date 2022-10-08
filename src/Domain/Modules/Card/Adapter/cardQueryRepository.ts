import IDBCardQueryRepository from '../../../../Infrastructure/Modules/Card/Repository/IDBCardQueryRepository';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';
import { cardMemento } from './cardMemento';

const cardQueryRepository = new IDBCardQueryRepository(cardMemento, idb);

export { cardQueryRepository };
