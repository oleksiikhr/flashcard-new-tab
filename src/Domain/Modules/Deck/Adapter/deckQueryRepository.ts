import IDBDeckQueryRepository from '../../../../Infrastructure/Modules/Deck/Repository/IDBDeckQueryRepository';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';
import { deckMemento } from './deckMemento';

const deckQueryRepository = new IDBDeckQueryRepository(deckMemento, idb);

export { deckQueryRepository };
