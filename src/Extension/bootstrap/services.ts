import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Model/Settings/Repository/LSSettingsQueryRepository';
import ThemeInjector from '../../Domain/Model/Settings/Theme/Service/ThemeInjector';
import PageManager from '../../UI/PageManager';
import { indexedDB as idbConfig } from '../config/database';
import LocalStorage from '../../Infrastructure/Persistence/LocalStorage/LocalStorage';
import list from '../../Infrastructure/Persistence/IndexedDB/Migration/list';
import IndexedDB from '../../Infrastructure/Persistence/IndexedDB/IndexedDB';
import LSSettingsCommandRepository from '../../Infrastructure/Persistence/Model/Settings/Repository/LSSettingsCommandRepository';
import IDBCardQueryRepository from '../../Infrastructure/Persistence/Model/Card/Repository/IDBCardQueryRepository';
import CardContentFactory from '../../Domain/Model/Card/Content/CardContentFactory';
import IDBCardCommandRepository from '../../Infrastructure/Persistence/Model/Card/Repository/IDBCardCommandRepository';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Model/Deck/Repository/IDBDeckQueryRepository';
import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Model/Deck/Repository/IDBDeckCommandRepository';
import DeckCreator from '../../Domain/Model/Deck/Service/DeckCreator';
import CardCreator from '../../Domain/Model/Card/Service/CardCreator';
import DeckMemento from '../../Domain/Model/Deck/Service/DeckMemento';
import CardMemento from '../../Domain/Model/Card/Service/CardMemento';
import DeckUpdater from '../../Domain/Model/Deck/Service/DeckUpdater';

export const cardContentFactory = new CardContentFactory();

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

export const cardMemento = new CardMemento(
  deckQueryRepository,
  cardContentFactory
);

export const cardQueryRepository = new IDBCardQueryRepository(
  cardMemento,
  cardContentFactory,
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
