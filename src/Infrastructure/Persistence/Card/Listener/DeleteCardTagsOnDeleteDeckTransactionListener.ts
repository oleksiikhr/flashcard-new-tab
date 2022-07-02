import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteCardTagsOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARD_TAG;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    let deleted = 0;
    const time = performance.now();
    const deckId = event.getDeck().getId().getIdentifier();
    const store = transaction.objectStore(StoreName.CARD_TAG);
    const request = store.index('deck_id_idx').openKeyCursor(deckId);

    return this.idb
      .requestKeyCursor(request, (primaryKey) => {
        store.delete(primaryKey);
        deleted += 1;
      })
      .finally(() => {
        this.logger.debug(
          'TransactionListener',
          this.constructor.name,
          'complete',
          { event, deleted, performance: performance.now() - time },
        );
      });
  }
}
