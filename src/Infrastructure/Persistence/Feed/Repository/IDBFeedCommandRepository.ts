import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import FeedCommandRepository from '../../../../Domain/Feed/Repository/FeedCommandRepository';
import CardMemento from '../../../../Domain/Card/CardMemento';
import Card from '../../../../Domain/Card/Card';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class IDBFeedCommandRepository implements FeedCommandRepository {
  constructor(private memento: CardMemento, private idb: IndexedDB) {}

  async create(card: Card): Promise<void> {
    const cardId = card.getId();

    const db = await this.idb.openDB();
    const request = db
      .transaction(StoreName.FEED, 'readwrite')
      .objectStore(StoreName.FEED)
      .add({
        card_id: cardId.getIdentifier(),
        deck_id: card.getDeck()?.getId()?.getIdentifier(),
      });

    await this.idb.request(request);
  }
}
