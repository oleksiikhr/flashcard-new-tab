import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import FeedCommandRepository from '../../../../Domain/Feed/Repository/FeedCommandRepository';
import CardMemento from '../../../../Domain/Card/CardMemento';
import Card from '../../../../Domain/Card/Card';
import DeckId from '../../../../Domain/Deck/DeckId';
import DomainDoesNotExistsError from "../../Shared/IndexedDB/Error/DomainDoesNotExistsError";

export default class IDBFeedCommandRepository implements FeedCommandRepository {
  constructor(private memento: CardMemento, private idb: IndexedDB) {}

  async create(card: Card): Promise<void> {
    const cardId = card.getId();

    if (undefined === cardId) {
      throw new DomainDoesNotExistsError();
    }

    const db = await this.idb.database();
    const request = db.transaction('feed', 'readwrite')
      .objectStore('feed')
      .add({ card_id: cardId.getIdentifier(), deck_id: card.getDeck()?.getId()?.getIdentifier() as number })

    await this.idb.request(request);
  }

  // deleteByDeckId(deckId: DeckId): Promise<void> {
    // const db = await this.idb.database();
    //
    // const request = db.transaction('feed', 'readwrite')
    //   .objectStore('feed')
    //   .index('deck_id')
    //   .getAll();
    //
    // for delete
  // }
}
