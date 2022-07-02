import CardDeleteTransactionEvent from '../../Card/Event/CardDeleteTransactionEvent';
import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DomainNotExistsError from '../../Shared/IndexedDB/Error/DomainNotExistsError';
import { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import Logger from '../../../../Domain/Shared/Service/Logger';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class UpdateDeckOnDeleteCardTransactionListener
  implements TransactionListener<CardDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB, private logger: Logger) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  public async invoke(
    transaction: IDBTransaction,
    event: CardDeleteTransactionEvent,
  ): Promise<unknown> {
    const time = performance.now();
    const card = event.getCard();
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.get(card.getDeckId().getIdentifier());
    const raw = await this.idb.requestPromise<DeckRaw>(request);

    if (undefined === raw) {
      throw new DomainNotExistsError(card.getId());
    }

    raw.cards_count -= 1;

    if (card.getIsActive()) {
      raw.active_cards_count -= 1;
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
