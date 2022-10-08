import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import TagCreateTransactionEvent from '../../Tag/Event/TagCreateTransactionEvent';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DomainNotExistsError from '../../../../Domain/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Modules/Deck/Service/DeckMemento';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class UpdateDeckOnCreateTagTransactionListener
  implements TransactionListener<TagCreateTransactionEvent>
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
    event: TagCreateTransactionEvent,
  ): Promise<unknown> {
    const tag = event.getTag();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.get(tag.getDeckId().getIdentifier());
    const raw = await this.idb.requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(tag.getDeckId());
    }

    raw.tags_count += 1;

    return this.idb.requestPromise(store.put(raw));
  }
}
