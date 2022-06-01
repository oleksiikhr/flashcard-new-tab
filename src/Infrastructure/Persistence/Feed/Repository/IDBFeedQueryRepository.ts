import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import FeedQueryRepository from '../../../../Domain/Feed/Repository/FeedQueryRepository';
import CardMemento from '../../../../Domain/Card/CardMemento';
import CardId from '../../../../Domain/Card/CardId';

export default class IDBFeedQueryRepository implements FeedQueryRepository {
  constructor(private memento: CardMemento, private idb: IndexedDB) {}

  async findRandom(): Promise<CardId | undefined> {
    const db = await this.idb.database();

    const request = db.transaction('feed', 'readonly').objectStore('feed');

    const total = (await this.idb.request<number>(request.count())) as number;

    if (0 === total) {
      return undefined;
    }

    return this.idb
      .random<{ card_id: number }>(request.openCursor(), total)
      .then((data) =>
        undefined !== data ? CardId.of(data.card_id) : undefined,
      );
  }
}
