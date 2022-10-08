import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import TagMemento from '../../../../Domain/Modules/Tag/Service/TagMemento';
import TagCreateTransactionEvent from '../Event/TagCreateTransactionEvent';
import TagId from '../../../../Domain/Modules/Tag/TagId';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class CreateTagTransactionListener
  implements TransactionListener<TagCreateTransactionEvent>
{
  constructor(private idb: IndexedDB, private memento: TagMemento) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagCreateTransactionEvent,
  ): Promise<unknown> {
    const tag = event.getTag();
    const raw = this.memento.serialize(tag);
    delete raw.id;

    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.add(raw);

    return this.idb.requestPromise<number>(request).then((id) => {
      tag.setId(TagId.of(id as number));
    });
  }
}
