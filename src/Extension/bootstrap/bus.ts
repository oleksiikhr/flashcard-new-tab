import ApplyThemeHandler from '../../Module/Core/Application/Command/Theme/ApplyThemeHandler';
import {
  cardCommandRepository,
  cardCreator,
  cardQueryRepository,
  contentFactory,
  deckCreator,
  deckQueryRepository,
  deckUpdater,
  settingsQueryRepository,
  themeInjector,
} from './services';
import FindActiveCardHandler from '../../Module/Core/Application/Query/Card/FindActiveCardHandler';
import CreateDeckHandler from '../../Module/Core/Application/Command/Deck/CreateDeckHandler';
import CreateCardHandler from '../../Module/Core/Application/Command/Card/CreateCardHandler';
import UpdateDeckHandler from '../../Module/Core/Application/Command/Deck/UpdateDeckHandler';

export const createDeckHandler = new CreateDeckHandler(deckCreator);

export const updateDeckHandler = new UpdateDeckHandler(deckUpdater);

export const createCardHandler = new CreateCardHandler(
  deckQueryRepository,
  contentFactory,
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
