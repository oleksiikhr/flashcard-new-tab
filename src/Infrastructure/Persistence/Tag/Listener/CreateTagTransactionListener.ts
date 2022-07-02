import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TagMemento from '../../../../Domain/Tag/TagMemento';
import TagCreateTransactionEvent from '../Event/TagCreateTransactionEvent';
import TagId from '../../../../Domain/Tag/TagId';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class CreateTagTransactionListener
  implements TransactionListener<TagCreateTransactionEvent>
{
  constructor(
    private idb: IndexedDB,
    private logger: Logger,
    private memento: TagMemento,
  ) {}

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
    const time = performance.now();
    const tag = event.getTag();
    const raw = this.memento.serialize(tag);
    delete raw.id;

    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.add(raw);

    return this.idb
      .requestPromise<number>(request)
      .then((id) => {
        tag.setId(TagId.of(id as number));
      })
      .finally(() => {
        this.logger.debug(
          'TransactionListener',
          this.constructor.name,
          'complete',
          { event, performance: Math.floor(performance.now() - time) },
        );
      });
  }
}
