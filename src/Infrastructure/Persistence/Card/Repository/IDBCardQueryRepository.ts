import Card from '../../../../Domain/Card/Card';
import CardId from '../../../../Domain/Card/CardId';
import CardContentFactory from '../../../../Domain/Card/Content/CardContentFactory';
import { CardQueryRepository } from '../../../../Domain/Card/Repository/CardQueryRepository';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import CardMemento, { CardRaw } from '../../../../Domain/Card/CardMemento';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(
    private contentFactory: CardContentFactory,
    private memento: CardMemento,
    private idb: IndexedDB,
  ) {}

  async findById(id: CardId): Promise<Card | undefined> {
    const db = await this.idb.database();

    const transaction = db.transaction(['feed', 'cards'], 'readwrite');

    transaction.addEventListener('complete', (evt) => console.log(evt))

    const promises = [];
    for (let i = 0; i < 2000; i++) {
      const request = transaction.objectStore('feed')
        .add({ card_id: i, deck_id: i });

      promises.push(this.idb.request(request));

      if (i === 100) {
        transaction.abort();
        throw new Error('2')
      }
    }
    // console.log(promises);
    throw new Error('1')

    console.log(id);
  //   const db = await this.idb.database();
  //
  //   const transaction = db.transaction(['cards', 'tags'], 'readonly');
  //
  //   // TODO
  //   console.log(id);
  //
  //   const request = transaction.objectStore('cards').get(id.getIdentifier());
  //
  //   return this.idb
  //     .request<CardRaw>(request)
  //     .then((raw) =>
  //       undefined !== raw ? this.memento.unserialize(raw) : undefined,
  //     );
  }
}
