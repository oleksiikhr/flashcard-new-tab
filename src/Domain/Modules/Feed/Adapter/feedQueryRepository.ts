import IDBFeedQueryRepository from '../../../../Infrastructure/Modules/Feed/Repository/IDBFeedQueryRepository';
import { deckMemento } from '../../Deck/Service';
import { cardMemento } from '../../Card/Service';
import { tagMemento } from '../../Tag/Service';
import { idb } from '../../../../Infrastructure/Persistence/IndexedDB';

const feedQueryRepository = new IDBFeedQueryRepository(
  deckMemento,
  cardMemento,
  tagMemento,
  idb,
);

export { feedQueryRepository };
