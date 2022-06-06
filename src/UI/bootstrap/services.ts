import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import DeckMemento from '../../Domain/Deck/DeckMemento';
import IndexedDB from '../../Infrastructure/Persistence/Shared/IndexedDB/IndexedDB';
import CardContentFactory from '../../Domain/Card/Content/CardContentFactory';
import CardMemento from '../../Domain/Card/CardMemento';
import IDBTagQueryRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import IDBCardQueryRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import IDBCardCommandRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import ThemeInjector from '../../Domain/Settings/Theme/Service/ThemeInjector';
import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import LocalStorage from '../../Infrastructure/Persistence/Shared/LocalStorage/LocalStorage';
import IDBFeedQueryRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedQueryRepository';
import IDBFeedCommandRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedCommandRepository';
import { indexedDB as idbConfig } from '../config/database';
import list from '../../Infrastructure/Persistence/Shared/IndexedDB/Migration/list';
import TagMemento from '../../Domain/Tag/TagMemento';
import IDBTagCommandRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import UpdateDeckOnDeleteCardTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnDeleteCardTransactionListener';
import TransactionPipeline from '../../Infrastructure/Persistence/Shared/IndexedDB/TransactionPipeline';
import UpdateDeckOnCreateTagTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnCreateTagTransactionListener';
import CreateCardTransactionListener from '../../Infrastructure/Persistence/Card/Listener/CreateCardTransactionListener';
import UpdateDeckOnCreateCardTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckOnCreateCardTransactionListener';
import UpdateCardTransactionListener from '../../Infrastructure/Persistence/Card/Listener/UpdateCardTransactionListener';
import DeleteCardTransactionListener from '../../Infrastructure/Persistence/Card/Listener/DeleteCardTransactionListener';
import DeleteFeedOnDeleteCardTransactionListener from '../../Infrastructure/Persistence/Feed/Listener/DeleteFeedOnDeleteCardTransactionListener';
import DeleteDeckTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/DeleteDeckTransactionListener';
import CreateDeckTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/CreateDeckTransactionListener';
import CreateTagTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/CreateTagTransactionListener';
import UpdateDeckTransactionListener from '../../Infrastructure/Persistence/Deck/Listener/UpdateDeckTransactionListener';
import UpdateTagTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/UpdateTagTransactionListener';
import DeleteTagTransactionListener from '../../Infrastructure/Persistence/Tag/Listener/DeleteTagTransactionListener';

const { register, make } = (() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = new Map<any, any>();

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: <T>(c: { new (...args: any[]): T }, cb: () => T): void => {
      state.set(c, { cb, resolved: undefined });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    make: <T>(c: { new (...args: any[]): T }): T => {
      const item = state.get(c) as
        | { cb: () => T; resolved: undefined | T }
        | undefined;

      if (undefined === item) {
        throw new Error(`${c.name} not registered!`);
      }

      if (!item.resolved) {
        item.resolved = item.cb();
      }

      return item.resolved;
    },
  };
})();

/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */

// Shared

register(IndexedDB, () => new IndexedDB(idbConfig.name, list));

register(LocalStorage, () => new LocalStorage());

register(TransactionPipeline, () => new TransactionPipeline(make(IndexedDB)));

/* ------------------------------------------------------------------------- */

// Settings

register(ThemeInjector, () => new ThemeInjector());

register(
  LSSettingsQueryRepository,
  () => new LSSettingsQueryRepository(make(LocalStorage)),
);

/* ------------------------------------------------------------------------- */

// Deck

register(DeckMemento, () => new DeckMemento());

register(
  IDBDeckQueryRepository,
  () => new IDBDeckQueryRepository(make(DeckMemento), make(IndexedDB)),
);

register(
  IDBDeckCommandRepository,
  () => new IDBDeckCommandRepository(make(TransactionPipeline)),
);

register(
  CreateDeckTransactionListener,
  () => new CreateDeckTransactionListener(make(DeckMemento)),
);

register(
  UpdateDeckTransactionListener,
  () => new UpdateDeckTransactionListener(make(DeckMemento)),
);

register(
  DeleteDeckTransactionListener,
  () => new DeleteDeckTransactionListener(),
);

register(
  UpdateDeckOnCreateCardTransactionListener,
  () => new UpdateDeckOnCreateCardTransactionListener(make(DeckMemento)),
);

register(
  UpdateDeckOnDeleteCardTransactionListener,
  () => new UpdateDeckOnDeleteCardTransactionListener(make(DeckMemento)),
);

/* ------------------------------------------------------------------------- */

// Card

register(CardContentFactory, () => new CardContentFactory());

register(
  CreateCardTransactionListener,
  () => new CreateCardTransactionListener(make(CardMemento)),
);

register(
  CardMemento,
  () =>
    new CardMemento(
      make(IDBDeckQueryRepository),
      make(IDBTagQueryRepository),
      make(CardContentFactory),
    ),
);

register(
  CardMemento,
  () =>
    new CardMemento(
      make(IDBDeckQueryRepository),
      make(IDBTagQueryRepository),
      make(CardContentFactory),
    ),
);

register(
  IDBCardQueryRepository,
  () =>
    new IDBCardQueryRepository(
      make(CardContentFactory),
      make(CardMemento),
      make(IndexedDB),
    ),
);

register(
  IDBCardCommandRepository,
  () => new IDBCardCommandRepository(make(TransactionPipeline)),
);

register(
  UpdateCardTransactionListener,
  () => new UpdateCardTransactionListener(make(CardMemento)),
);

register(
  DeleteCardTransactionListener,
  () => new DeleteCardTransactionListener(),
);

/* ------------------------------------------------------------------------- */

// Tag

register(
  UpdateDeckOnCreateTagTransactionListener,
  () => new UpdateDeckOnCreateTagTransactionListener(make(DeckMemento)),
);

register(TagMemento, () => new TagMemento(make(IDBDeckQueryRepository)));

register(
  IDBTagQueryRepository,
  () => new IDBTagQueryRepository(make(TagMemento), make(IndexedDB)),
);

register(
  IDBTagCommandRepository,
  () => new IDBTagCommandRepository(make(TransactionPipeline)),
);

register(
  CreateTagTransactionListener,
  () => new CreateTagTransactionListener(make(TagMemento)),
);

register(
  UpdateTagTransactionListener,
  () => new UpdateTagTransactionListener(make(TagMemento)),
);

register(
  DeleteTagTransactionListener,
  () => new DeleteTagTransactionListener(),
);

/* ------------------------------------------------------------------------- */

// Feed

register(
  IDBFeedQueryRepository,
  () => new IDBFeedQueryRepository(make(CardMemento), make(IndexedDB)),
);

register(
  IDBFeedCommandRepository,
  () => new IDBFeedCommandRepository(make(CardMemento), make(IndexedDB)),
);

register(
  DeleteFeedOnDeleteCardTransactionListener,
  () => new DeleteFeedOnDeleteCardTransactionListener(),
);

/* ------------------------------------------------------------------------- */

export default make;
