import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import CardUpdateTransactionEvent from '../../Card/Event/CardUpdateTransactionEvent';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class UpdateDeckOnUpdateCardTransactionListener
  implements TransactionListener<CardUpdateTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(event: CardUpdateTransactionEvent): boolean {
    return event.getCard().isChangedActive();
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardUpdateTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.get(card.getDeckId().getIdentifier());
    const raw = await this.idb.requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(card.getId());
    }

    if (card.isChangedActive()) {
      raw.active_cards_count += card.getIsActive() ? 1 : -1;
    }

    return this.idb.requestPromise(store.put(raw)).finally(() => {
      this.logger.debug(
        'TransactionListener',
        this.constructor.name,
        'complete',
        { event, performance: Math.floor(performance.now() - time) },
      );
    });
  }
}
