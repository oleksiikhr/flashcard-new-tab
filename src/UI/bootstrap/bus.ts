import CreateCardHandler from '../../Application/Command/Card/CreateCardHandler';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import IDBTagQueryRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import CardContentFactory from '../../Domain/Card/Content/CardContentFactory';
import CardCreator from '../../Domain/Card/Service/CardCreator';
import CreateCardCommand from '../../Application/Command/Card/CreateCardCommand';
import ApplyThemeHandler from '../../Application/Command/Theme/ApplyThemeHandler';
import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import ThemeInjector from '../../Domain/Settings/Theme/Service/ThemeInjector';
import ApplyThemeCommand from '../../Application/Command/Theme/ApplyThemeCommand';
import make from './services';
import GenerateFeedHandler from '../../Application/Command/Feed/GenerateFeedHandler';
import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import IDBFeedCommandRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedCommandRepository';
import IDBCardQueryRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import GenerateFeedCommand from '../../Application/Command/Feed/GenerateFeedCommand';
import FindFeedHandler from '../../Application/Query/Feed/FindFeedHandler';
import IDBCardCommandRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBFeedQueryRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedQueryRepository';
import FindFeedCommand from '../../Application/Query/Feed/FindFeedCommand';
import CreateDeckHandler from '../../Application/Command/Deck/CreateDeckHandler';
import DeckCreator from '../../Domain/Deck/Service/DeckCreator';
import CreateDeckCommand from '../../Application/Command/Deck/CreateDeckCommand';
import CreateTagHandler from '../../Application/Command/Tag/CreateTagHandler';
import TagCreator from '../../Domain/Tag/Service/TagCreator';
import CreateTagCommand from '../../Application/Command/Tag/CreateTagCommand';
import UpdateDeckHandler from '../../Application/Command/Deck/UpdateDeckHandler';
import DeckUpdater from '../../Domain/Deck/Service/DeckUpdater';
import UpdateDeckCommand from '../../Application/Command/Deck/UpdateDeckCommand';
import DeleteDeckHandler from '../../Application/Command/Deck/DeleteDeckHandler';
import DeckDeleter from '../../Domain/Deck/Service/DeckDeleter';
import DeleteDeckCommand from '../../Application/Command/Deck/DeleteDeckCommand';

/* ------------------------------------------------------------------------- */

// Settings

export const applyTheme = (selector: string) =>
  new ApplyThemeHandler(
    make(LSSettingsQueryRepository),
    make(ThemeInjector),
  ).invoke(new ApplyThemeCommand(selector));

/* ------------------------------------------------------------------------- */

// Deck

export const createDeck = (name: string, isActive: boolean, settings: object) =>
  new CreateDeckHandler(make(DeckCreator)).invoke(
    new CreateDeckCommand(name, isActive, settings),
  );

export const updateDeck = (
  id: number,
  name: string,
  isActive: boolean,
  settings: object,
) =>
  new UpdateDeckHandler(make(DeckUpdater)).invoke(
    new UpdateDeckCommand(id, name, isActive, settings),
  );

export const deleteDeck = (id: number) =>
  new DeleteDeckHandler(make(DeckDeleter)).invoke(new DeleteDeckCommand(id));

/* ------------------------------------------------------------------------- */

// Card

export const createCard = (
  deckId: number,
  question: string,
  content: object,
  templateType: number,
  tagIds: number[],
) =>
  new CreateCardHandler(
    make(IDBDeckQueryRepository),
    make(IDBTagQueryRepository),
    make(CardContentFactory),
    make(CardCreator),
  ).invoke(
    new CreateCardCommand(deckId, question, content, templateType, tagIds),
  );

/* ------------------------------------------------------------------------- */

// Tag

export const createTag = (deckId: number, name: string, isActive: boolean) =>
  new CreateTagHandler(make(IDBDeckQueryRepository), make(TagCreator)).invoke(
    new CreateTagCommand(deckId, name, isActive),
  );

/* ------------------------------------------------------------------------- */

// Feed

export const generateFeed = (limit: number) =>
  new GenerateFeedHandler(
    make(IDBDeckCommandRepository),
    make(IDBFeedCommandRepository),
    make(IDBDeckQueryRepository),
    make(IDBCardQueryRepository),
    make(IDBTagQueryRepository),
  ).invoke(new GenerateFeedCommand(limit));

export const findFeed = () =>
  new FindFeedHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
    make(IDBFeedQueryRepository),
  ).invoke(new FindFeedCommand());

/* ------------------------------------------------------------------------- */
