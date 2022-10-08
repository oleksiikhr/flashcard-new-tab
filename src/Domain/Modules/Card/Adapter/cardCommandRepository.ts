import IDBCardCommandRepository from '../../../../Infrastructure/Modules/Card/Repository/IDBCardCommandRepository';
import {
  idb,
  transactionPipeline,
} from '../../../../Infrastructure/Persistence/IndexedDB';
import { cardMemento } from './cardMemento';

const cardCommandRepository = new IDBCardCommandRepository(
  transactionPipeline,
  cardMemento,
  idb,
);

export { cardCommandRepository };
