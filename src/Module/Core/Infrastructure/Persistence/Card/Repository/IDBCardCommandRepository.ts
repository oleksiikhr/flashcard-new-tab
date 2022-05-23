import Card from '../../../../Domain/Card/Card';
import IndexedDB from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/IndexedDB';
import { CardCommandRepository } from '../../../../Domain/Card/Repository/CardCommandRepository';
import AlreadyExistsError from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/Error/AlreadyExistsError';
import DoesNotExistsIdError from '../../../../../Shared/Infrastructure/Persistence/IndexedDB/Error/DoesNotExistsIdError';

export default class IDBCardCommandRepository implements CardCommandRepository {
  constructor(private idb: IndexedDB) {}

  async create(card: Card): Promise<void> {
    const raw = card.serialize();

    if (undefined !== raw.id) {
      throw new AlreadyExistsError();
    }

    const db = await this.idb.connection();
    delete raw.id;

    const request = db
      .transaction('cards', 'readwrite')
      .objectStore('cards')
      .add(raw);

    return this.idb.request(request);
  }

  async update(card: Card): Promise<void> {
    const raw = card.serialize();

    if (undefined === raw.id) {
      throw new DoesNotExistsIdError();
    }

    const db = await this.idb.connection();

    const request = db
      .transaction('cards', 'readwrite')
      .objectStore('cards')
      .put(raw);

    return this.idb.request(request);
  }
}
