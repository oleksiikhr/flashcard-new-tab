import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteCardsOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    let deleted = 0;
    const time = performance.now();
    const store = transaction.objectStore(StoreName.CARDS);
    const index = store.index('deck_id_and_is_active_idx');
    const deckId = event.getDeck().getId().getIdentifier();

    return Promise.all([
      this.idb.requestKeyCursor(
        index.openKeyCursor(IDBKeyRange.only([deckId, 0])),
        (primaryKey) => {
          store.delete(primaryKey);
          deleted += 1;
        },
      ),
      this.idb.requestKeyCursor(
        index.openKeyCursor(IDBKeyRange.only([deckId, 1])),
        (primaryKey) => {
          store.delete(primaryKey);
          deleted += 1;
        },
      ),
    ]).finally(() => {
      this.logger.debug(
        'TransactionListener',
        this.constructor.name,
        'complete',
        { event, deleted, performance: performance.now() - time },
      );
    });
  }
}
