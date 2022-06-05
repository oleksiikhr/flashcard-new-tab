import CreateCardHandler from '../../Application/Command/Card/CreateCardHandler';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import IDBTagQueryRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import CardContentFactory from '../../Domain/Card/Content/CardContentFactory';
import ApplyThemeHandler from '../../Application/Command/Theme/ApplyThemeHandler';
import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import ThemeInjector from '../../Domain/Settings/Theme/Service/ThemeInjector';
import make from './services';
import GenerateFeedHandler from '../../Application/Command/Feed/GenerateFeedHandler';
import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import IDBFeedCommandRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedCommandRepository';
import IDBCardQueryRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import FindFeedHandler from '../../Application/Query/Feed/FindFeedHandler';
import IDBCardCommandRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBFeedQueryRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedQueryRepository';
import CreateDeckHandler from '../../Application/Command/Deck/CreateDeckHandler';
import CreateTagHandler from '../../Application/Command/Tag/CreateTagHandler';
import UpdateDeckHandler from '../../Application/Command/Deck/UpdateDeckHandler';
import DeleteDeckHandler from '../../Application/Command/Deck/DeleteDeckHandler';
import DeleteCardHandler from '../../Application/Command/Card/DeleteDeckHandler';
import IDBTagCommandRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';

/* ------------------------------------------------------------------------- */

// Settings

export const applyTheme = (selector: string) =>
  new ApplyThemeHandler(
    make(LSSettingsQueryRepository),
    make(ThemeInjector),
  ).invoke(selector);

/* ------------------------------------------------------------------------- */

// Deck

export const createDeck = (name: string, isActive: boolean, settings: object) =>
  new CreateDeckHandler(make(IDBDeckCommandRepository)).invoke(
    name,
    isActive,
    settings,
  );

export const updateDeck = (
  id: number,
  name: string,
  isActive: boolean,
  settings: object,
) =>
  new UpdateDeckHandler(
    make(IDBDeckCommandRepository),
    make(IDBDeckQueryRepository),
  ).invoke(id, name, isActive, settings);

export const deleteDeck = (id: number) =>
  new DeleteDeckHandler(
    make(IDBDeckCommandRepository),
    make(IDBDeckQueryRepository),
  ).invoke(id);

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
    make(IDBCardCommandRepository),
    make(IDBDeckQueryRepository),
    make(IDBTagQueryRepository),
    make(CardContentFactory),
  ).invoke(deckId, question, content, templateType, tagIds);

export const deleteCard = (id: number) =>
  new DeleteCardHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
  ).invoke(id);

/* ------------------------------------------------------------------------- */

// Tag

export const createTag = (deckId: number, name: string, isActive: boolean) =>
  new CreateTagHandler(
    make(IDBTagCommandRepository),
    make(IDBDeckQueryRepository),
  ).invoke(deckId, name, isActive);

/* ------------------------------------------------------------------------- */

// Feed

export const generateFeed = (limit: number) =>
  new GenerateFeedHandler(
    make(IDBDeckCommandRepository),
    make(IDBFeedCommandRepository),
    make(IDBDeckQueryRepository),
    make(IDBCardQueryRepository),
    make(IDBTagQueryRepository),
  ).invoke(limit);

export const findFeed = () =>
  new FindFeedHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
    make(IDBFeedQueryRepository),
  ).invoke();

/* ------------------------------------------------------------------------- */
