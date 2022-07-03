import make from './services';
import TransactionPipeline from '../../Infrastructure/Persistence/Shared/IndexedDB/Transaction/TransactionPipeline';
import CreateDeckTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/CreateDeckTransactionListener';
import UpdateDeckTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckTransactionListener';
import DeckCreateTransactionEvent from '../../Infrastructure/Persistence/Deck/Event/DeckCreateTransactionEvent';
import DeckMemento from '../../Domain/Deck/DeckMemento';
import ConsoleLogger from '../../Infrastructure/Service/Logger/ConsoleLogger';
import DeckUpdateTransactionEvent from '../../Infrastructure/Persistence/Deck/Event/DeckUpdateTransactionEvent';
import DeckDeleteTransactionEvent from '../../Infrastructure/Persistence/Deck/Event/DeckDeleteTransactionEvent';
import DeleteCardsOnDeleteDeckTransactionListener from '../../Infrastructure/Persistence/Card/Listener/DeleteCardsOnDeleteDeckTransactionListener';
import DeleteFeedOnDeleteDeckTransactionListener from '../../Infrastructure/Persistence/Feed/Listener/DeleteFeedOnDeleteDeckTransactionListener';
import DeleteTagsOnDeleteDeckTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/DeleteTagsOnDeleteDeckTransactionListener';
import DeleteCardTagsOnDeleteDeckTransactionListener from '../../Infrastructure/Persistence/Card/Listener/DeleteCardTagsOnDeleteDeckTransactionListener';
import DeleteDeckTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/DeleteDeckTransactionListener';
import CardCreateTransactionEvent from '../../Infrastructure/Persistence/Card/Event/CardCreateTransactionEvent';
import CreateCardTransactionListener from '../../Infrastructure/Persistence/Card/Listener/CreateCardTransactionListener';
import CardMemento from '../../Domain/Card/CardMemento';
import UpdateDeckOnCreateCardTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnCreateCardTransactionListener';
import CardUpdateTransactionEvent from '../../Infrastructure/Persistence/Card/Event/CardUpdateTransactionEvent';
import UpdateCardTransactionListener from '../../Infrastructure/Persistence/Card/Listener/UpdateCardTransactionListener';
import UpdateDeckOnUpdateCardTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnUpdateCardTransactionListener';
import CardDeleteTransactionEvent from '../../Infrastructure/Persistence/Card/Event/CardDeleteTransactionEvent';
import UpdateDeckOnDeleteCardTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnDeleteCardTransactionListener';
import DeleteFeedOnDeleteCardTransactionListener from '../../Infrastructure/Persistence/Feed/Listener/DeleteFeedOnDeleteCardTransactionListener';
import DeleteCardTransactionListener from '../../Infrastructure/Persistence/Card/Listener/DeleteCardTransactionListener';
import CardSyncTagsTransactionEvent from '../../Infrastructure/Persistence/Card/Event/CardSyncTagsTransactionEvent';
import SyncCardToTagsTransactionListener from '../../Infrastructure/Persistence/Card/Listener/SyncCardToTagsTransactionListener';
import TagCreateTransactionEvent from '../../Infrastructure/Persistence/Tag/Event/TagCreateTransactionEvent';
import CreateTagTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/CreateTagTransactionListener';
import TagMemento from '../../Domain/Tag/TagMemento';
import UpdateDeckOnCreateTagTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnCreateTagTransactionListener';
import TagUpdateTransactionEvent from '../../Infrastructure/Persistence/Tag/Event/TagUpdateTransactionEvent';
import UpdateTagTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/UpdateTagTransactionListener';
import TagDeleteTransactionEvent from '../../Infrastructure/Persistence/Tag/Event/TagDeleteTransactionEvent';
import UpdateDeckOnDeleteTagTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnDeleteTagTransactionListener';
import DeleteTagTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/DeleteTagTransactionListener';
import FeedCreateTransactionEvent from '../../Infrastructure/Persistence/Feed/Event/FeedCreateTransactionEvent';
import CreateFeedTransactionListener from '../../Infrastructure/Persistence/Feed/Listener/CreateFeedTransactionListener';
import FeedDeleteByIdDeckTransactionEvent from '../../Infrastructure/Persistence/Feed/Event/FeedDeleteByIdDeckTransactionEvent';
import DeleteFeedByDeckIdTransactionListener from '../../Infrastructure/Persistence/Feed/Listener/DeleteFeedByDeckIdTransactionListener';
import IndexedDB from '../../Infrastructure/Persistence/Shared/IndexedDB/IndexedDB';

function registerTransactionPipeline(): void {
  const pipeline = make(TransactionPipeline);

  pipeline.subscribe(DeckCreateTransactionEvent, [
    new CreateDeckTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
      make(DeckMemento),
    ),
  ]);

  pipeline.subscribe(DeckUpdateTransactionEvent, [
    new UpdateDeckTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
      make(DeckMemento),
    ),
  ]);

  pipeline.subscribe(DeckDeleteTransactionEvent, [
    new DeleteCardsOnDeleteDeckTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteFeedOnDeleteDeckTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteTagsOnDeleteDeckTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteCardTagsOnDeleteDeckTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteDeckTransactionListener(make(IndexedDB), make(ConsoleLogger)),
  ]);

  pipeline.subscribe(CardCreateTransactionEvent, [
    new CreateCardTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
      make(CardMemento),
    ),
    new UpdateDeckOnCreateCardTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
  ]);

  pipeline.subscribe(CardUpdateTransactionEvent, [
    new UpdateCardTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
      make(CardMemento),
    ),
    new UpdateDeckOnUpdateCardTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
  ]);

  pipeline.subscribe(CardDeleteTransactionEvent, [
    new UpdateDeckOnDeleteCardTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteFeedOnDeleteCardTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteCardTransactionListener(make(IndexedDB), make(ConsoleLogger)),
  ]);

  pipeline.subscribe(CardSyncTagsTransactionEvent, [
    new SyncCardToTagsTransactionListener(make(IndexedDB), make(ConsoleLogger)),
  ]);

  pipeline.subscribe(TagCreateTransactionEvent, [
    new CreateTagTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
      make(TagMemento),
    ),
    new UpdateDeckOnCreateTagTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
  ]);

  pipeline.subscribe(TagUpdateTransactionEvent, [
    new UpdateTagTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
      make(TagMemento),
    ),
  ]);

  pipeline.subscribe(TagDeleteTransactionEvent, [
    new UpdateDeckOnDeleteTagTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
    new DeleteTagTransactionListener(make(IndexedDB), make(ConsoleLogger)),
    // todo card_tag
  ]);

  pipeline.subscribe(FeedCreateTransactionEvent, [
    new CreateFeedTransactionListener(make(IndexedDB), make(ConsoleLogger)),
  ]);

  pipeline.subscribe(FeedDeleteByIdDeckTransactionEvent, [
    new DeleteFeedByDeckIdTransactionListener(
      make(IndexedDB),
      make(ConsoleLogger),
    ),
  ]);
}

export default () => {
  registerTransactionPipeline();
};
