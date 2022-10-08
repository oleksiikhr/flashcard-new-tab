import Deck from '../../../../Domain/Modules/Deck/Deck';
import DeckCommandRepository from '../../../../Domain/Modules/Deck/Repository/DeckCommandRepository';
import TransactionPipeline from '../../../Persistence/IndexedDB/Transaction/TransactionPipeline';
import DeckDeleteTransactionEvent from '../Event/DeckDeleteTransactionEvent';
import DeckCreateTransactionEvent from '../Event/DeckCreateTransactionEvent';
import DeckUpdateTransactionEvent from '../Event/DeckUpdateTransactionEvent';
import CreateDeckTransactionListener from '../Listener/CreateDeckTransactionListener';
import { deckMemento } from '../../../../Domain/Modules/Deck/Service';
import { idb } from '../../../Persistence/IndexedDB';
import UpdateDeckTransactionListener from '../Listener/UpdateDeckTransactionListener';
import DeleteCardsOnDeleteDeckTransactionListener from '../../Card/Listener/DeleteCardsOnDeleteDeckTransactionListener';
import DeleteFeedOnDeleteDeckTransactionListener from '../../Feed/Listener/DeleteFeedOnDeleteDeckTransactionListener';
import DeleteTagsOnDeleteDeckTransactionListener from '../../Tag/Listener/DeleteTagsOnDeleteDeckTransactionListener';
import DeleteCardTagsOnDeleteDeckTransactionListener from '../../Card/Listener/DeleteCardTagsOnDeleteDeckTransactionListener';
import DeleteDeckTransactionListener from '../Listener/DeleteDeckTransactionListener';

export default class IDBDeckCommandRepository implements DeckCommandRepository {
  constructor(private pipeline: TransactionPipeline) {}

  public async create(deck: Deck): Promise<void> {
    const event = new DeckCreateTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new CreateDeckTransactionListener(idb, deckMemento),
    ]);
  }

  public async update(deck: Deck): Promise<void> {
    const event = new DeckUpdateTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new UpdateDeckTransactionListener(idb, deckMemento),
    ]);
  }

  public async delete(deck: Deck): Promise<void> {
    const event = new DeckDeleteTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new DeleteCardsOnDeleteDeckTransactionListener(idb),
      new DeleteFeedOnDeleteDeckTransactionListener(idb),
      new DeleteTagsOnDeleteDeckTransactionListener(idb),
      new DeleteCardTagsOnDeleteDeckTransactionListener(idb),
      new DeleteDeckTransactionListener(idb),
    ]);
  }
}
