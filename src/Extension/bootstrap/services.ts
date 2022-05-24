import LSSettingsQueryRepository from '../../Module/Core/Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import ThemeInjector from '../../Module/Core/Domain/Settings/Theme/Service/ThemeInjector';
import PageManager from '../../Module/Core/UI/PageManager';
import { indexedDB as idbConfig } from '../config/database';
import LocalStorage from '../../Module/Shared/Infrastructure/Persistence/LocalStorage/LocalStorage';
import list from '../../Module/Shared/Infrastructure/Persistence/IndexedDB/Migration/list';
import IndexedDB from '../../Module/Shared/Infrastructure/Persistence/IndexedDB/IndexedDB';
import LSSettingsCommandRepository from '../../Module/Core/Infrastructure/Persistence/Settings/Repository/LSSettingsCommandRepository';
import IDBCardQueryRepository from '../../Module/Core/Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import CardContentFactory from '../../Module/Core/Domain/Card/Content/CardContentFactory';
import IDBCardCommandRepository from '../../Module/Core/Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBDeckQueryRepository from '../../Module/Core/Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import IDBDeckCommandRepository from '../../Module/Core/Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import DeckCreator from '../../Module/Core/Domain/Deck/Service/DeckCreator';
import CardCreator from '../../Module/Core/Domain/Card/Service/CardCreator';
import DeckMemento from '../../Module/Core/Domain/Deck/Service/DeckMemento';
import CardMemento from '../../Module/Core/Domain/Card/Service/CardMemento';
import DeckUpdater from '../../Module/Core/Domain/Deck/Service/DeckUpdater';

export const contentFactory = new CardContentFactory();

export const themeInjector = new ThemeInjector();

export const pageManager = new PageManager();

export const deckMemento = new DeckMemento();

const indexedDB = new IndexedDB(idbConfig.name, list);
const localStorage = new LocalStorage();

export const settingsQueryRepository = new LSSettingsQueryRepository(
  localStorage
);

export const settingsCommandRepository = new LSSettingsCommandRepository(
  localStorage
);

export const deckQueryRepository = new IDBDeckQueryRepository(
  deckMemento,
  indexedDB
);

export const deckCommandRepository = new IDBDeckCommandRepository(
  deckMemento,
  indexedDB
);

export const cardMemento = new CardMemento(deckQueryRepository, contentFactory);

export const cardQueryRepository = new IDBCardQueryRepository(
  cardMemento,
  contentFactory,
  indexedDB
);

export const cardCommandRepository = new IDBCardCommandRepository(
  deckMemento,
  cardMemento,
  indexedDB
);

export const deckCreator = new DeckCreator(deckCommandRepository);

export const cardCreator = new CardCreator(cardCommandRepository);

export const deckUpdater = new DeckUpdater(
  deckCommandRepository,
  deckQueryRepository
);

export default {
  settingsCommandRepository,
  settingsQueryRepository,
  deckCommandRepository,
  cardCommandRepository,
  cardQueryRepository,
  deckQueryRepository,
  themeInjector,
  pageManager,
  deckCreator,
  deckMemento,
  deckUpdater,
  cardCreator,
};
