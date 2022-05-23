import ApplyThemeHandler from '../../Module/Core/Application/Command/Theme/ApplyThemeHandler';
import { settingsQueryRepository, themeInjector } from './services';

export const applyThemeHandler = new ApplyThemeHandler(
  settingsQueryRepository,
  themeInjector
);

export default {
  applyThemeHandler,
};
