import TransactionListener from '../../Shared/IndexedDB/Bus/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TagMemento from '../../../../Domain/Tag/TagMemento';
import TagCreateTransactionEvent from '../Event/TagCreateTransactionEvent';
import TagId from '../../../../Domain/Tag/TagId';

export default class CreateTagTransactionListener
  implements TransactionListener<TagCreateTransactionEvent>
{
  constructor(private memento: TagMemento) {}

  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagCreateTransactionEvent,
  ): Promise<unknown>[] {
    const tag = event.getTag();
    const raw = this.memento.serialize(tag);
    delete raw.id;

    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.add(raw);

    return [
      requestPromise<number>(request).then((id) => {
        tag.setId(TagId.of(id as number));
      }),
    ];
  }
}
