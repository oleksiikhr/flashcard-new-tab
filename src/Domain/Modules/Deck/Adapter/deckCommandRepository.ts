import IDBDeckCommandRepository from '../../../../Infrastructure/Modules/Deck/Repository/IDBDeckCommandRepository';
import {
  idb,
  transactionPipeline,
} from '../../../../Infrastructure/Persistence/IndexedDB';
import { deckMemento } from './deckMemento';

const deckCommandRepository = new IDBDeckCommandRepository(
  transactionPipeline,
  deckMemento,
  idb,
);

export { deckCommandRepository };
