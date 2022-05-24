import ApplyThemeHandler from '../../Application/Command/Theme/ApplyThemeHandler';
import {
  cardCommandRepository,
  cardCreator,
  cardQueryRepository,
  cardContentFactory,
  deckCreator,
  deckQueryRepository,
  deckUpdater,
  settingsQueryRepository,
  themeInjector,
} from './services';
import FindActiveCardHandler from '../../Application/Query/Card/FindActiveCardHandler';
import CreateDeckHandler from '../../Application/Command/Deck/CreateDeckHandler';
import CreateCardHandler from '../../Application/Command/Card/CreateCardHandler';
import UpdateDeckHandler from '../../Application/Command/Deck/UpdateDeckHandler';

export const createDeckHandler = new CreateDeckHandler(deckCreator);

export const updateDeckHandler = new UpdateDeckHandler(deckUpdater);

export const createCardHandler = new CreateCardHandler(
  deckQueryRepository,
  cardContentFactory,
  cardCreator
);

export const findActiveCardHandler = new FindActiveCardHandler(
  cardCommandRepository,
  cardQueryRepository
);

export const applyThemeHandler = new ApplyThemeHandler(
  settingsQueryRepository,
  themeInjector
);

export default {
  findActiveCardHandler,
  applyThemeHandler,
  createDeckHandler,
  createCardHandler,
  updateDeckHandler,
};
