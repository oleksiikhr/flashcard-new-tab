import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import FeedQueryRepository from '../../../../Domain/Feed/Repository/FeedQueryRepository';
import CardMemento from '../../../../Domain/Card/CardMemento';
import CardId from '../../../../Domain/Card/CardId';
import StoreName from '../../Shared/IndexedDB/StoreName';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';

export default class IDBFeedQueryRepository implements FeedQueryRepository {
  constructor(private memento: CardMemento, private idb: IndexedDB) {}

  async findRandom(): Promise<CardId | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.FEED, 'readonly')
      .objectStore(StoreName.FEED);

    const total = (await requestPromise<number>(request.count())) as number;

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
