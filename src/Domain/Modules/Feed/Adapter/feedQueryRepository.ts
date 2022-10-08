import IDBFeedQueryRepository from '../../../../Infrastructure/Modules/Feed/Repository/IDBFeedQueryRepository';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';
import { deckMemento } from '../../Deck/Adapter/deckMemento';
import { cardMemento } from '../../Card/Adapter/cardMemento';
import { tagMemento } from '../../Tag/Adapter/tagMemento';

const feedQueryRepository = new IDBFeedQueryRepository(
  deckMemento,
  cardMemento,
  tagMemento,
  idb,
);

export { feedQueryRepository };
