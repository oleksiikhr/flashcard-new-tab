import make from '../../UI/bootstrap/services';
import TransactionPipeline from '../Persistence/Shared/IndexedDB/Transaction/TransactionPipeline';
import DeleteDeckTransactionListener from '../Persistence/Deck/Listener/DeleteDeckTransactionListener';
import CreateCardTransactionListener from '../Persistence/Card/Listener/CreateCardTransactionListener';
import UpdateDeckOnCreateCardTransactionListener from '../Persistence/Deck/Listener/UpdateDeckOnCreateCardTransactionListener';
import UpdateCardTransactionListener from '../Persistence/Card/Listener/UpdateCardTransactionListener';
import DeleteCardTransactionListener from '../Persistence/Card/Listener/DeleteCardTransactionListener';
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
import DeleteFeedOnDeleteDeckTransactionListener from '../Persistence/Feed/Listener/DeleteFeedOnDeleteDeckTransactionListener';
import DeckCreateTransactionEvent from '../Persistence/Deck/Event/DeckCreateTransactionEvent';
import DeckUpdateTransactionEvent from '../Persistence/Deck/Event/DeckUpdateTransactionEvent';
import DeckDeleteTransactionEvent from '../Persistence/Deck/Event/DeckDeleteTransactionEvent';
import CardCreateTransactionEvent from '../Persistence/Card/Event/CardCreateTransactionEvent';
import CardUpdateTransactionEvent from '../Persistence/Card/Event/CardUpdateTransactionEvent';
import CardDeleteTransactionEvent from '../Persistence/Card/Event/CardDeleteTransactionEvent';
import TagCreateTransactionEvent from '../Persistence/Tag/Event/TagCreateTransactionEvent';
import TagUpdateTransactionEvent from '../Persistence/Tag/Event/TagUpdateTransactionEvent';
import TagDeleteTransactionEvent from '../Persistence/Tag/Event/TagDeleteTransactionEvent';
import FeedCreateTransactionEvent from '../Persistence/Feed/Event/FeedCreateTransactionEvent';
import CreateFeedTransactionListener from '../Persistence/Feed/Listener/CreateFeedTransactionListener';
import FeedDeleteByIdDeckTransactionEvent from '../Persistence/Feed/Event/FeedDeleteByIdDeckTransactionEvent';
import DeleteFeedByDeckIdTransactionListener from '../Persistence/Feed/Listener/DeleteFeedByDeckIdTransactionListener';
import CardSyncTagsTransactionEvent from '../Persistence/Card/Event/CardSyncTagsTransactionEvent';
import SyncCardToTagsTransactionListener from '../Persistence/Card/Listener/SyncCardToTagsTransactionListener';
import DeleteTagsOnDeleteDeckTransactionListener from '../Persistence/Tag/Listener/DeleteTagsOnDeleteDeckTransactionListener';
import DeleteCardTagsOnDeleteDeckTransactionListener from '../Persistence/Card/Listener/DeleteCardTagsOnDeleteDeckTransactionListener';
import UpdateDeckOnUpdateCardTransactionListener from '../Persistence/Deck/Listener/UpdateDeckOnUpdateCardTransactionListener';

export default class IDBTransactionProvider {
  constructor(private pipeline: TransactionPipeline) {}

  public invoke(): void {
    this.pipeline.subscribe(DeckCreateTransactionEvent, [
      new CreateDeckTransactionListener(make(DeckMemento)),
    ]);

    this.pipeline.subscribe(DeckUpdateTransactionEvent, [
      new UpdateDeckTransactionListener(make(DeckMemento)),
    ]);

    this.pipeline.subscribe(DeckDeleteTransactionEvent, [
      new DeleteCardsOnDeleteDeckTransactionListener(),
      new DeleteFeedOnDeleteDeckTransactionListener(),
      new DeleteTagsOnDeleteDeckTransactionListener(),
      new DeleteCardTagsOnDeleteDeckTransactionListener(),
      new DeleteDeckTransactionListener(),
    ]);

    this.pipeline.subscribe(CardCreateTransactionEvent, [
      new CreateCardTransactionListener(make(CardMemento)),
      new UpdateDeckOnCreateCardTransactionListener(),
    ]);

    this.pipeline.subscribe(CardUpdateTransactionEvent, [
      new UpdateCardTransactionListener(make(CardMemento)),
      new UpdateDeckOnUpdateCardTransactionListener(),
    ]);

    this.pipeline.subscribe(CardDeleteTransactionEvent, [
      new UpdateDeckOnDeleteCardTransactionListener(),
      new DeleteFeedOnDeleteCardTransactionListener(),
      new DeleteCardTransactionListener(),
    ]);

    this.pipeline.subscribe(CardSyncTagsTransactionEvent, [
      new SyncCardToTagsTransactionListener(),
    ]);

    this.pipeline.subscribe(TagCreateTransactionEvent, [
      new CreateTagTransactionListener(make(TagMemento)),
      new UpdateDeckOnCreateTagTransactionListener(),
    ]);

    this.pipeline.subscribe(TagUpdateTransactionEvent, [
      new UpdateTagTransactionListener(make(TagMemento)),
    ]);

    this.pipeline.subscribe(TagDeleteTransactionEvent, [
      new UpdateDeckOnDeleteTagTransactionListener(),
      new DeleteTagTransactionListener(),
      // todo card_tag
    ]);

    this.pipeline.subscribe(FeedCreateTransactionEvent, [
      new CreateFeedTransactionListener(),
    ]);

    this.pipeline.subscribe(FeedDeleteByIdDeckTransactionEvent, [
      new DeleteFeedByDeckIdTransactionListener(),
    ]);
  }
}
