import ApplyThemeHandler from '../../Application/Command/Theme/ApplyThemeHandler';
import CreateDeckHandler from '../../Application/Command/Deck/CreateDeckHandler';
import CreateCardHandler from '../../Application/Command/Card/CreateCardHandler';
import UpdateDeckHandler from '../../Application/Command/Deck/UpdateDeckHandler';
import DeleteDeckHandler from '../../Application/Command/Deck/DeleteDeckHandler';
import CardContentFactory from '../../Domain/Card/Content/CardContentFactory';
import ThemeInjector from '../../Domain/Settings/Theme/Service/ThemeInjector';
import DeckMemento from '../../Domain/Deck/DeckMemento';
import IndexedDB from '../../Infrastructure/Persistence/Shared/IndexedDB/IndexedDB';
import LocalStorage from '../../Infrastructure/Persistence/Shared/LocalStorage/LocalStorage';
import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import CardMemento from '../../Domain/Card/CardMemento';
import IDBCardQueryRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import IDBCardCommandRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import DeckCreator from '../../Domain/Deck/Service/DeckCreator';
import CardCreator from '../../Domain/Card/Service/CardCreator';
import DeckUpdater from '../../Domain/Deck/Service/DeckUpdater';
import DeckDeleter from '../../Domain/Deck/Service/DeckDeleter';
import { indexedDB as idbConfig } from '../config/database';
import list from '../../Infrastructure/Persistence/Shared/IndexedDB/Migration/list';
import CreateDeckCommand from '../../Application/Command/Deck/CreateDeckCommand';
import UpdateDeckCommand from '../../Application/Command/Deck/UpdateDeckCommand';
import DeleteDeckCommand from '../../Application/Command/Deck/DeleteDeckCommand';
import CreateCardCommand from '../../Application/Command/Card/CreateCardCommand';
import ApplyThemeCommand from '../../Application/Command/Theme/ApplyThemeCommand';
import GenerateFeedHandler from '../../Application/Command/Feed/GenerateFeedHandler';
import GenerateFeedCommand from '../../Application/Command/Feed/GenerateFeedCommand';
import TagMemento from '../../Domain/Tag/Service/TagMemento';
import IDBTagQueryRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import IDBTagCommandRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import TagCreator from '../../Domain/Tag/Service/TagCreator';
import TagDeleter from '../../Domain/Tag/Service/TagDeleter';
import TagUpdater from '../../Domain/Tag/Service/TagUpdater';
import CreateTagHandler from '../../Application/Command/Tag/CreateTagHandler';
import CreateTagCommand from '../../Application/Command/Tag/CreateTagCommand';
import FindFeedHandler from '../../Application/Query/Feed/FindFeedHandler';
import FindFeedCommand from '../../Application/Query/Feed/FindFeedCommand';
import IDBFeedQueryRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedQueryRepository';
import IDBFeedCommandRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedCommandRepository';

/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */

const cardContentFactory = new CardContentFactory();

const themeInjector = new ThemeInjector();

const deckMemento = new DeckMemento();

const indexedDB = new IndexedDB(idbConfig.name, list);
const localStorage = new LocalStorage();

const settingsQueryRepository = new LSSettingsQueryRepository(localStorage);

const deckQueryRepository = new IDBDeckQueryRepository(deckMemento, indexedDB);

const deckCommandRepository = new IDBDeckCommandRepository(
  deckMemento,
  indexedDB,
);

const deckCreator = new DeckCreator(deckCommandRepository);

const deckUpdater = new DeckUpdater(deckCommandRepository, deckQueryRepository);

const deckDeleter = new DeckDeleter(deckCommandRepository, deckQueryRepository);

const tagMemento = new TagMemento(deckQueryRepository);

const tagQueryRepository = new IDBTagQueryRepository(tagMemento, indexedDB);

const tagCommandRepository = new IDBTagCommandRepository(tagMemento, indexedDB);

const tagCreator = new TagCreator(tagCommandRepository);

const tagUpdator = new TagUpdater(tagCommandRepository, tagQueryRepository);

const tagDeleter = new TagDeleter(tagCommandRepository, tagQueryRepository);

const cardMemento = new CardMemento(
  deckQueryRepository,
  tagQueryRepository,
  cardContentFactory,
);

const cardQueryRepository = new IDBCardQueryRepository(
  cardContentFactory,
  cardMemento,
  indexedDB,
);

const cardCommandRepository = new IDBCardCommandRepository(
  deckMemento,
  cardMemento,
  indexedDB,
);

const cardCreator = new CardCreator(cardCommandRepository);

const feedQueryRepository = new IDBFeedQueryRepository(cardMemento, indexedDB);

const feedCommandRepository = new IDBFeedCommandRepository(
  cardMemento,
  indexedDB,
);

/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */

export const createDeck = (name: string, isActive: boolean, settings: object) =>
  new CreateDeckHandler(deckCreator).invoke(
    new CreateDeckCommand(name, isActive, settings),
  );

export const createTag = (deckId: number, name: string, isActive: boolean) =>
  new CreateTagHandler(deckQueryRepository, tagCreator).invoke(
    new CreateTagCommand(deckId, name, isActive),
  );

export const updateDeck = (
  id: number,
  name: string,
  isActive: boolean,
  settings: object,
) =>
  new UpdateDeckHandler(deckUpdater).invoke(
    new UpdateDeckCommand(id, name, isActive, settings),
  );

export const deleteDeck = (id: number) =>
  new DeleteDeckHandler(deckDeleter).invoke(new DeleteDeckCommand(id));

export const createCard = (
  deckId: number,
  question: string,
  content: object,
  templateType: number,
  tagIds: number[],
) =>
  new CreateCardHandler(
    deckQueryRepository,
    tagQueryRepository,
    cardContentFactory,
    cardCreator,
  ).invoke(
    new CreateCardCommand(deckId, question, content, templateType, tagIds),
  );

export const applyTheme = (selector: string) =>
  new ApplyThemeHandler(settingsQueryRepository, themeInjector).invoke(
    new ApplyThemeCommand(selector),
  );

export const generateFeed = (limit: number) =>
  new GenerateFeedHandler(
    deckCommandRepository,
    feedCommandRepository,
    deckQueryRepository,
    cardQueryRepository,
    tagQueryRepository,
  ).invoke(new GenerateFeedCommand(limit));

export const findFeed = () =>
  new FindFeedHandler(
    cardCommandRepository,
    cardQueryRepository,
    feedQueryRepository,
  ).invoke(new FindFeedCommand());

export default {
  generateFeed,
  deleteDeck,
  applyTheme,
  createDeck,
  createCard,
  updateDeck,
  createTag,
  findFeed,
};
