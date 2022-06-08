import make from '../../UI/bootstrap/services';
import TransactionPipeline from '../Persistence/Shared/IndexedDB/Transaction/TransactionPipeline';
import StoreName from '../Persistence/Shared/IndexedDB/StoreName';
import DeleteDeckTransactionListener from '../Persistence/Deck/Listener/DeleteDeckTransactionListener';
import CreateCardTransactionListener from '../Persistence/Card/Listener/CreateCardTransactionListener';
import UpdateDeckOnCreateCardTransactionListener from '../Persistence/Deck/Listener/UpdateDeckOnCreateCardTransactionListener';
import UpdateCardTransactionListener from '../Persistence/Card/Listener/UpdateCardTransactionListener';
import DeleteCardTransactionListener from '../Persistence/Card/Listener/DeleteCardTransactionListener';
import TransactionAction from '../Persistence/Shared/IndexedDB/Transaction/TransactionAction';
import CreateDeckTransactionListener from '../Persistence/Deck/Listener/CreateDeckTransactionListener';
import CreateTagTransactionListener from '../Persistence/Tag/Listener/CreateTagTransactionListener';
import UpdateDeckOnCreateTagTransactionListener from '../Persistence/Deck/Listener/UpdateDeckOnCreateTagTransactionListener';
import UpdateDeckTransactionListener from '../Persistence/Deck/Listener/UpdateDeckTransactionListener';
import DeleteFeedOnDeleteCardTransactionListener from '../Persistence/Feed/Listener/DeleteFeedOnDeleteCardTransactionListener';
import UpdateDeckOnDeleteCardTransactionListener from '../Persistence/Deck/Listener/UpdateDeckOnDeleteCardTransactionListener';
import DeckMemento from '../../Domain/Deck/DeckMemento';
import CardMemento from '../../Domain/Card/CardMemento';
import TagMemento from '../../Domain/Tag/TagMemento';
import DeleteCardsOnDeleteDeckTransactionListener from '../Persistence/Card/Listener/DeleteCardsOnDeleteDeckTransactionListener';
import UpdateTagTransactionListener from '../Persistence/Tag/Listener/UpdateTagTransactionListener';
import DeleteTagTransactionListener from '../Persistence/Tag/Listener/DeleteTagTransactionListener';
import UpdateDeckOnDeleteTagTransactionListener from '../Persistence/Deck/Listener/UpdateDeckOnDeleteTagTransactionListener';

export default class IDBTransactionProvider {
  constructor(private pipeline: TransactionPipeline) {}

  invoke() {
    this.pipeline.subscribe(StoreName.DECKS, TransactionAction.CREATE, [
      new CreateDeckTransactionListener(make(DeckMemento)),
    ]);

    this.pipeline.subscribe(StoreName.DECKS, TransactionAction.UPDATE, [
      new UpdateDeckTransactionListener(make(DeckMemento)),
    ]);

    this.pipeline.subscribe(StoreName.DECKS, TransactionAction.DELETE, [
      new DeleteDeckTransactionListener(),
      new DeleteCardsOnDeleteDeckTransactionListener(),
      // TODO delete card_tag
      // TODO delete feed
      // TODO delete tags
    ]);

    this.pipeline.subscribe(StoreName.CARDS, TransactionAction.CREATE, [
      new CreateCardTransactionListener(make(CardMemento)),
      new UpdateDeckOnCreateCardTransactionListener(),
    ]);

    this.pipeline.subscribe(StoreName.CARDS, TransactionAction.UPDATE, [
      new UpdateCardTransactionListener(make(CardMemento)),
    ]);

    this.pipeline.subscribe(StoreName.CARDS, TransactionAction.DELETE, [
      new DeleteCardTransactionListener(),
      new UpdateDeckOnDeleteCardTransactionListener(),
      new DeleteFeedOnDeleteCardTransactionListener(),
    ]);

    this.pipeline.subscribe(StoreName.TAGS, TransactionAction.CREATE, [
      new CreateTagTransactionListener(make(TagMemento)),
      new UpdateDeckOnCreateTagTransactionListener(),
    ]);

    this.pipeline.subscribe(StoreName.TAGS, TransactionAction.UPDATE, [
      new UpdateTagTransactionListener(make(TagMemento)),
    ]);

    this.pipeline.subscribe(StoreName.TAGS, TransactionAction.DELETE, [
      new DeleteTagTransactionListener(),
      new UpdateDeckOnDeleteTagTransactionListener(),
    ]);
  }
}
