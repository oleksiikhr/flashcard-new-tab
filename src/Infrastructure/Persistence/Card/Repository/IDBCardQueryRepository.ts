import Card from '../../../../Domain/Card/Card';
import CardId from '../../../../Domain/Card/CardId';
import CardContentFactory from '../../../../Domain/Card/Content/CardContentFactory';
import { CardQueryRepository } from '../../../../Domain/Card/Repository/CardQueryRepository';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import CardMemento, {
  CardRaw,
} from '../../../../Domain/Card/Service/CardMemento';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(
    private memento: CardMemento,
    private contentFactory: CardContentFactory,
    private idb: IndexedDB
  ) {}

  async findById(id: CardId): Promise<Card | undefined> {
    const db = await this.idb.database();

    const request = db
      .transaction('cards')
      .objectStore('cards')
      .get(id.getIdentifier());

    return this.idb
      .request<CardRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined
      );
  }
}
