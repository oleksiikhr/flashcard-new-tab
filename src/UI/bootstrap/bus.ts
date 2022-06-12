import make from './services';
import CreateVocabularyCardHandler from '../../Application/Command/Card/CreateVocabularyCardHandler';
import IDBDeckQueryRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import LSSettingsQueryRepository from '../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import GenerateFeedHandler from '../../Application/Command/Feed/GenerateFeedHandler';
import IDBDeckCommandRepository from '../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import IDBFeedCommandRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedCommandRepository';
import IDBCardQueryRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import FindRandomFeedHandler from '../../Application/Query/Feed/FindRandomFeedHandler';
import IDBCardCommandRepository from '../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBFeedQueryRepository from '../../Infrastructure/Persistence/Feed/Repository/IDBFeedQueryRepository';
import CreateDeckHandler from '../../Application/Command/Deck/CreateDeckHandler';
import CreateTagHandler from '../../Application/Command/Tag/CreateTagHandler';
import UpdateDeckHandler from '../../Application/Command/Deck/UpdateDeckHandler';
import DeleteDeckHandler from '../../Application/Command/Deck/DeleteDeckHandler';
import DeleteCardHandler from '../../Application/Command/Card/DeleteDeckHandler';
import IDBTagCommandRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import FindDeckHandler from '../../Application/Query/Deck/FindDeckHandler';
import PaginateDeckHandler from '../../Application/Query/Deck/PaginateDeckHandler';
import PaginateCardHandler from '../../Application/Query/Card/PaginateCardHandler';
import FindCardHandler from '../../Application/Query/Card/FindCardHandler';
import UpdateVocabularyCardHandler from '../../Application/Command/Card/UpdateVocabularyCardHandler';
import UpdateTagHandler from '../../Application/Command/Tag/UpdateTagHandler';
import IDBTagQueryRepository from '../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import PaginateTagHandler from '../../Application/Query/Tag/PaginateTagHandler';
import FindTagHandler from '../../Application/Query/Tag/FindTagHandler';
import DeleteTagHandler from '../../Application/Command/Tag/DeleteTagHandler';
import SyncTagsToCardHandler from '../../Application/Command/Card/SyncTagsToCardHandler';
import FindThemeHandler from '../../Application/Query/Theme/FindThemeHandler';

/* ------------------------------------------------------------------------- */

// Settings

export const findTheme = () =>
  new FindThemeHandler(make(LSSettingsQueryRepository)).invoke();

/* ------------------------------------------------------------------------- */

// Deck

export const paginateDecks = (fromId: number | undefined, limit: number) =>
  new PaginateDeckHandler(make(IDBDeckQueryRepository)).invoke(fromId, limit);

export const findDeck = (id: number) =>
  new FindDeckHandler(make(IDBDeckQueryRepository)).invoke(id);

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

export const paginateCards = (fromId: number | undefined, limit: number) =>
  new PaginateCardHandler(make(IDBCardQueryRepository)).invoke(fromId, limit);

export const findCard = (id: number) =>
  new FindCardHandler(make(IDBCardQueryRepository)).invoke(id);

export const createVocabularyCard = (
  deckId: number,
  question: string,
  answer: string,
  transcription: string,
) =>
  new CreateVocabularyCardHandler(
    make(IDBCardCommandRepository),
    make(IDBDeckQueryRepository),
  ).invoke(deckId, question, answer, transcription);

export const updateVocabularyCard = (
  id: number,
  question: string,
  answer: string,
  transcription: string,
) =>
  new UpdateVocabularyCardHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
  ).invoke(id, question, answer, transcription);

export const deleteCard = (id: number) =>
  new DeleteCardHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
  ).invoke(id);

export const syncTagsToCard = (cardId: number, tagIds: number[]) =>
  new SyncTagsToCardHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
    make(IDBTagQueryRepository),
  ).invoke(cardId, tagIds);

/* ------------------------------------------------------------------------- */

// Tag

export const paginateTags = (fromId: number | undefined, limit: number) =>
  new PaginateTagHandler(make(IDBTagQueryRepository)).invoke(fromId, limit);

export const findTag = (id: number) =>
  new FindTagHandler(make(IDBTagQueryRepository)).invoke(id);

export const createTag = (deckId: number, name: string) =>
  new CreateTagHandler(
    make(IDBTagCommandRepository),
    make(IDBDeckQueryRepository),
  ).invoke(deckId, name);

export const updateTag = (id: number, name: string) =>
  new UpdateTagHandler(
    make(IDBTagCommandRepository),
    make(IDBTagQueryRepository),
  ).invoke(id, name);

export const deleteTag = (id: number) =>
  new DeleteTagHandler(
    make(IDBTagCommandRepository),
    make(IDBTagQueryRepository),
  ).invoke(id);

/* ------------------------------------------------------------------------- */

// Feed

export const generateFeed = (limit: number) =>
  new GenerateFeedHandler(
    make(IDBDeckCommandRepository),
    make(IDBFeedCommandRepository),
    make(IDBDeckQueryRepository),
    make(IDBCardQueryRepository),
  ).invoke(limit);

export const findRandomFeed = () =>
  new FindRandomFeedHandler(
    make(IDBCardCommandRepository),
    make(IDBCardQueryRepository),
    make(IDBDeckQueryRepository),
    make(IDBFeedQueryRepository),
  ).invoke();

/* ------------------------------------------------------------------------- */
