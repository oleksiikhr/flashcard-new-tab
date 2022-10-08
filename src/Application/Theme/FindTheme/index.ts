import FindThemeHandler from './FindThemeHandler';
import { settingsQueryRepository } from '../../../Domain/Modules/Settings/Adapter/settingsQueryRepository';
import { identifyColorScheme } from '../../../Domain/Modules/Settings/Adapter/identifyColorScheme';

const findTheme = new FindThemeHandler(
  settingsQueryRepository,
  identifyColorScheme,
);

export { findTheme };
