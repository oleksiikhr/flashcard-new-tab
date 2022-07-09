import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import TagDeleteTransactionEvent from '../../Tag/Event/TagDeleteTransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class UpdateDeckOnDeleteTagTransactionListener
  implements TransactionListener<TagDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: TagDeleteTransactionEvent,
  ): Promise<unknown> {
    const tag = event.getTag();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.get(tag.getDeckId().getIdentifier());
    const raw = await this.idb.requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(tag.getDeckId());
    }

    raw.tags_count -= 1;

    return this.idb.requestPromise(store.put(raw));
  }
}
