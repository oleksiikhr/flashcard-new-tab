import Deck from '../../../../Domain/Modules/Deck/Deck';
import DeckCommandRepository from '../../../../Domain/Modules/Deck/Repository/DeckCommandRepository';
import TransactionPipeline from '../../../Persistence/IndexedDB/Transaction/TransactionPipeline';
import DeckDeleteTransactionEvent from '../Event/DeckDeleteTransactionEvent';
import DeckCreateTransactionEvent from '../Event/DeckCreateTransactionEvent';
import DeckUpdateTransactionEvent from '../Event/DeckUpdateTransactionEvent';
import CreateDeckTransactionListener from '../Listener/CreateDeckTransactionListener';
import UpdateDeckTransactionListener from '../Listener/UpdateDeckTransactionListener';
import DeleteCardsOnDeleteDeckTransactionListener from '../../Card/Listener/DeleteCardsOnDeleteDeckTransactionListener';
import DeleteFeedOnDeleteDeckTransactionListener from '../../Feed/Listener/DeleteFeedOnDeleteDeckTransactionListener';
import DeleteTagsOnDeleteDeckTransactionListener from '../../Tag/Listener/DeleteTagsOnDeleteDeckTransactionListener';
import DeleteCardTagsOnDeleteDeckTransactionListener from '../../Card/Listener/DeleteCardTagsOnDeleteDeckTransactionListener';
import DeleteDeckTransactionListener from '../Listener/DeleteDeckTransactionListener';
import DeckMemento from '../../../../Domain/Modules/Deck/Service/DeckMemento';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class IDBDeckCommandRepository implements DeckCommandRepository {
  constructor(
    private pipeline: TransactionPipeline,
    private deckMemento: DeckMemento,
    private idb: IndexedDB,
  ) {}

  public async create(deck: Deck): Promise<void> {
    const event = new DeckCreateTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new CreateDeckTransactionListener(this.idb, this.deckMemento),
    ]);
  }

  public async update(deck: Deck): Promise<void> {
    const event = new DeckUpdateTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new UpdateDeckTransactionListener(this.idb, this.deckMemento),
    ]);
  }

  public async delete(deck: Deck): Promise<void> {
    const event = new DeckDeleteTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new DeleteCardsOnDeleteDeckTransactionListener(this.idb),
      new DeleteFeedOnDeleteDeckTransactionListener(this.idb),
      new DeleteTagsOnDeleteDeckTransactionListener(this.idb),
      new DeleteCardTagsOnDeleteDeckTransactionListener(this.idb),
      new DeleteDeckTransactionListener(this.idb),
    ]);
  }
}
