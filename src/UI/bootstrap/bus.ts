import ApplyThemeHandler from '../../Application/Command/Theme/ApplyThemeHandler';
import FindActiveCardHandler from '../../Application/Query/Card/FindActiveCardHandler';
import CreateDeckHandler from '../../Application/Command/Deck/CreateDeckHandler';
import CreateCardHandler from '../../Application/Command/Card/CreateCardHandler';
import UpdateDeckHandler from '../../Application/Command/Deck/UpdateDeckHandler';
import DeleteDeckHandler from '../../Application/Command/Deck/DeleteDeckHandler';
import CardContentFactory from '../../Domain/Card/Content/CardContentFactory';
import ThemeInjector from '../../Domain/Settings/Theme/Service/ThemeInjector';
import DeckMemento from '../../Domain/Deck/Service/DeckMemento';
import IndexedDB from '../../Infrastructure/Persistence/Shared/IndexedDB/IndexedDB';
import LocalStorage from '../../Infrastructure/Persistence/Shared/LocalStorage/LocalStorage';
import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import CardMemento from '../../Domain/Card/Service/CardMemento';
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
import FindActiveCardCommand from '../../Application/Query/Card/FindActiveCardCommand';
import ApplyThemeCommand from '../../Application/Command/Theme/ApplyThemeCommand';

const cardContentFactory = new CardContentFactory();

const themeInjector = new ThemeInjector();

const deckMemento = new DeckMemento();

const indexedDB = new IndexedDB(idbConfig.name, list);
const localStorage = new LocalStorage();

const settingsQueryRepository = new LSSettingsQueryRepository(localStorage);

const deckQueryRepository = new IDBDeckQueryRepository(deckMemento, indexedDB);

const deckCommandRepository = new IDBDeckCommandRepository(
  deckMemento,
  indexedDB
);

const cardMemento = new CardMemento(deckQueryRepository, cardContentFactory);

const cardQueryRepository = new IDBCardQueryRepository(
  cardMemento,
  cardContentFactory,
  indexedDB
);

const cardCommandRepository = new IDBCardCommandRepository(
  deckMemento,
  cardMemento,
  indexedDB
);

const deckCreator = new DeckCreator(deckCommandRepository);

const cardCreator = new CardCreator(cardCommandRepository);

const deckUpdater = new DeckUpdater(deckCommandRepository, deckQueryRepository);

const deckDeleter = new DeckDeleter(deckCommandRepository, deckQueryRepository);

/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */

export const createDeckHandler = (
  name: string,
  isActive: boolean,
  settings: object
) =>
  new CreateDeckHandler(deckCreator).invoke(
    new CreateDeckCommand(name, isActive, settings)
  );

export const updateDeckHandler = (
  id: number,
  name: string,
  isActive: boolean,
  settings: object
) =>
  new UpdateDeckHandler(deckUpdater).invoke(
    new UpdateDeckCommand(id, name, isActive, settings)
  );

export const deleteDeckHandler = (id: number) =>
  new DeleteDeckHandler(deckDeleter).invoke(new DeleteDeckCommand(id));

export const createCardHandler = (
  deckId: number,
  question: string,
  content: object,
  templateType: number
) =>
  new CreateCardHandler(
    deckQueryRepository,
    cardContentFactory,
    cardCreator
  ).invoke(new CreateCardCommand(deckId, question, content, templateType));

export const findActiveCardHandler = () =>
  new FindActiveCardHandler(cardCommandRepository, cardQueryRepository).invoke(
    new FindActiveCardCommand()
  );

export const applyThemeHandler = (selector: string) =>
  new ApplyThemeHandler(settingsQueryRepository, themeInjector).invoke(
    new ApplyThemeCommand(selector)
  );

export default {
  findActiveCardHandler,
  deleteDeckHandler,
  applyThemeHandler,
  createDeckHandler,
  createCardHandler,
  updateDeckHandler,
};
