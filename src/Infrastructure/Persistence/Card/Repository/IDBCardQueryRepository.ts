import Card from '../../../../Domain/Card/Card';
import CardId from '../../../../Domain/Card/CardId';
import CardQueryRepository from '../../../../Domain/Card/Repository/CardQueryRepository';
import CardContentFactory from '../../../../Domain/Card/Content/CardContentFactory';
import CardMemento, { CardRaw } from '../../../../Domain/Card/CardMemento';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import {
  requestPaginate,
  requestPromise,
} from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(
    private contentFactory: CardContentFactory,
    private memento: CardMemento,
    private idb: IndexedDB,
  ) {}

  async paginate(fromId: CardId | undefined, limit: number): Promise<Card[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.CARDS)
      .objectStore(StoreName.CARDS)
      .openCursor(
        undefined !== fromId
          ? IDBKeyRange.lowerBound(fromId.getIdentifier())
          : null,
      );

    return requestPaginate<CardRaw>(request, limit).then((raws) =>
      Promise.all(raws.map((raw) => this.memento.unserialize(raw))),
    );
  }

  async findById(id: CardId): Promise<Card | undefined> {
    const db = await this.idb.openDB();

    const transaction = db.transaction([StoreName.CARDS], 'readonly');

    const request = transaction
      .objectStore(StoreName.CARDS)
      .get(id.getIdentifier());

    return requestPromise<CardRaw>(request).then((raw) =>
      undefined !== raw ? this.memento.unserialize(raw) : undefined,
    );
  }
}
