import ApplyThemeHandler from '../../Module/Core/Application/Command/Theme/ApplyThemeHandler';
import {
  cardCommandRepository,
  cardQueryRepository,
  settingsQueryRepository,
  themeInjector,
} from './services';
import FindActiveCardHandler from '../../Module/Core/Application/Query/Card/FindActiveCardHandler';

export const applyThemeHandler = new ApplyThemeHandler(
  settingsQueryRepository,
  themeInjector
);

export const findActiveCard = new FindActiveCardHandler(
  cardCommandRepository,
  cardQueryRepository
);

export default {
  applyThemeHandler,
  findActiveCard,
};
