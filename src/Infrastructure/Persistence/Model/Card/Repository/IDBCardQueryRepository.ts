import Card from '../../../../../Domain/Model/Card/Card';
import CardId from '../../../../../Domain/Model/Card/CardId';
import CardContentFactory from '../../../../../Domain/Model/Card/Content/CardContentFactory';
import { CardQueryRepository } from '../../../../../Domain/Model/Card/Repository/CardQueryRepository';
import IndexedDB from '../../../IndexedDB/IndexedDB';
import CardMemento, {
  CardRaw,
} from '../../../../../Domain/Model/Card/Service/CardMemento';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(
    private memento: CardMemento,
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
        undefined !== raw ? this.memento.unserialize(raw) : undefined
      );
  }
}
