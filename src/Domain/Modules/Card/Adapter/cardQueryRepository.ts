import IDBCardQueryRepository from '../../../../Infrastructure/Modules/Card/Repository/IDBCardQueryRepository';
import { cardMemento } from '../Service';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';

const cardQueryRepository = new IDBCardQueryRepository(cardMemento, idb);

export { cardQueryRepository };
