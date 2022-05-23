import Card, { CardRaw, unserialize } from '../../../../Domain/Card/Card';
import CardId from '../../../../Domain/Card/CardId';
import CardContentFactory from '../../../../Domain/Card/Content/CardContentFactory';
import { CardQueryRepository } from '../../../../Domain/Card/Repository/CardQueryRepository';
import IndexedDB from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/IndexedDB';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(
    private contentFactory: CardContentFactory,
    private idb: IndexedDB
  ) {}

  async findById(id: CardId): Promise<Card | undefined> {
    const db = await this.idb.connection();

    const request = db
      .transaction('cards')
      .objectStore('cards')
      .get(id.getIdentifier());

    return this.idb
      .request<CardRaw>(request)
      .then((raw) =>
        undefined !== raw ? unserialize(raw, this.contentFactory) : undefined
      );
  }
}
