import Tag from '../../../../Domain/Tag/Tag';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import TagCommandRepository from '../../../../Domain/Tag/Repository/TagCommandRepository';
import DomainAlreadyExistsError from '../../Shared/IndexedDB/Error/DomainAlreadyExistsError';
import TagId from '../../../../Domain/Tag/TagId';
import TagMemento from '../../../../Domain/Tag/Service/TagMemento';
import DeckId from '../../../../Domain/Deck/DeckId';

export default class IDBTagCommandRepository implements TagCommandRepository {
  constructor(private memento: TagMemento, private idb: IndexedDB) {}

  public async create(tag: Tag): Promise<void> {
    const raw = this.memento.serialize(tag);

    if (undefined !== raw.id) {
      throw new DomainAlreadyExistsError();
    }

    const db = await this.idb.database();
    delete raw.id;

    const request = db
      .transaction('tags', 'readwrite')
      .objectStore('tags')
      .add(raw);

    await this.idb.request<number>(request).then((id) => {
      tag.setId(TagId.of(id as number));
    });
  }

  public async update(tag: Tag): Promise<void> {
    const raw = this.memento.serialize(tag);
    const db = await this.idb.database();

    const request = db
      .transaction('tags', 'readwrite')
      .objectStore('tags')
      .put(raw);

    await this.idb.request(request);
  }

  public async delete(id: TagId): Promise<void> {
    const db = await this.idb.database();

    const request = db
      .transaction('tags', 'readwrite')
      .objectStore('tags')
      .delete(id.getIdentifier());

    // TODO relations?

    await this.idb.request(request);
  }

  // public async deleteByDeckId(deckId: DeckId): Promise<void> {
  //   const db = await this.idb.database();
  //
  //   const request = db
  //     .transaction('tags', 'readwrite')
  //     .objectStore('tags')
  //     .index('deck_id_and_is_active')
  //     .openKeyCursor();
  //
  //   await Promise.all(this.idb.request(request));
  // }
}
