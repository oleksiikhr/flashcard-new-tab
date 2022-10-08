import Card from '../../../../Domain/Modules/Card/Card';
import TransactionPipeline from '../../../Persistence/IndexedDB/Transaction/TransactionPipeline';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';
import CardCreateTransactionEvent from '../Event/CardCreateTransactionEvent';
import CardUpdateTransactionEvent from '../Event/CardUpdateTransactionEvent';
import Tag from '../../../../Domain/Modules/Tag/Tag';
import CardSyncTagsTransactionEvent from '../Event/CardSyncTagsTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';
import CardMemento from '../../../../Domain/Modules/Card/Service/CardMemento';
import CreateCardTransactionListener from '../Listener/CreateCardTransactionListener';
import UpdateDeckOnCreateCardTransactionListener from '../../Deck/Listener/UpdateDeckOnCreateCardTransactionListener';
import UpdateCardTransactionListener from '../Listener/UpdateCardTransactionListener';
import UpdateDeckOnUpdateCardTransactionListener from '../../Deck/Listener/UpdateDeckOnUpdateCardTransactionListener';
import UpdateDeckOnDeleteCardTransactionListener from '../../Deck/Listener/UpdateDeckOnDeleteCardTransactionListener';
import DeleteFeedOnDeleteCardTransactionListener from '../../Feed/Listener/DeleteFeedOnDeleteCardTransactionListener';
import DeleteCardTransactionListener from '../Listener/DeleteCardTransactionListener';
import SyncCardToTagsTransactionListener from '../Listener/SyncCardToTagsTransactionListener';
import CardCommandRepository from '../../../../Domain/Modules/Card/Repository/CardCommandRepository';

export default class IDBCardCommandRepository implements CardCommandRepository {
  constructor(
    private transactionPipeline: TransactionPipeline,
    private cardMemento: CardMemento,
    private idb: IndexedDB,
  ) {}

  public create(card: Card): Promise<void> {
    const event = new CardCreateTransactionEvent(card);

    return this.transactionPipeline.trigger(event, [
      new CreateCardTransactionListener(this.idb, this.cardMemento),
      new UpdateDeckOnCreateCardTransactionListener(this.idb),
    ]);
  }

  public update(card: Card): Promise<void> {
    const event = new CardUpdateTransactionEvent(card);

    return this.transactionPipeline.trigger(event, [
      new UpdateCardTransactionListener(this.idb, this.cardMemento),
      new UpdateDeckOnUpdateCardTransactionListener(this.idb),
    ]);
  }

  public delete(card: Card): Promise<void> {
    const event = new CardDeleteTransactionEvent(card);

    return this.transactionPipeline.trigger(event, [
      new UpdateDeckOnDeleteCardTransactionListener(this.idb),
      new DeleteFeedOnDeleteCardTransactionListener(this.idb),
      new DeleteCardTransactionListener(this.idb),
    ]);
  }

  public syncTags(card: Card, tags: Tag[]): Promise<void> {
    const event = new CardSyncTagsTransactionEvent(card, tags);

    return this.transactionPipeline.trigger(event, [
      new SyncCardToTagsTransactionListener(this.idb),
    ]);
  }
}
