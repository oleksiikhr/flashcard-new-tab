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

export default class IDBTransactionProvider {
  constructor(private pipeline: TransactionPipeline) {}

  invoke() {
    this.pipeline.subscribe(StoreName.DECKS, TransactionAction.CREATE, [
      make(CreateDeckTransactionListener),
    ]);

    this.pipeline.subscribe(StoreName.DECKS, TransactionAction.UPDATE, [
      make(UpdateDeckTransactionListener),
    ]);

    this.pipeline.subscribe(StoreName.DECKS, TransactionAction.DELETE, [
      make(DeleteDeckTransactionListener),
    ]);

    this.pipeline.subscribe(StoreName.CARDS, TransactionAction.CREATE, [
      make(CreateCardTransactionListener),
      make(UpdateDeckOnCreateCardTransactionListener),
    ]);

    this.pipeline.subscribe(StoreName.CARDS, TransactionAction.UPDATE, [
      make(UpdateCardTransactionListener),
    ]);

    this.pipeline.subscribe(StoreName.CARDS, TransactionAction.DELETE, [
      make(DeleteCardTransactionListener),
      make(UpdateDeckOnDeleteCardTransactionListener),
      make(DeleteFeedOnDeleteCardTransactionListener),
    ]);

    this.pipeline.subscribe(StoreName.TAGS, TransactionAction.CREATE, [
      make(CreateTagTransactionListener),
      make(UpdateDeckOnCreateTagTransactionListener),
    ]);
  }
}
