import IDBDeckCommandRepository from '../../../../Infrastructure/Modules/Deck/Repository/IDBDeckCommandRepository';
import { transactionPipeline } from '../../../../Infrastructure/Persistence/IndexedDB';

const deckCommandRepository = new IDBDeckCommandRepository(transactionPipeline);

export { deckCommandRepository };
