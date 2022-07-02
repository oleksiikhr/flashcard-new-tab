import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TagDeleteTransactionEvent from '../Event/TagDeleteTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteTagTransactionListener
  implements TransactionListener<TagDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagDeleteTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const tag = event.getTag();
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.delete(tag.getId().getIdentifier());

    return this.idb.requestPromise<number>(request).finally(() => {
      this.logger.debug(
        'TransactionListener',
        this.constructor.name,
        'complete',
        { event, performance: performance.now() - time },
      );
    });
  }
}
