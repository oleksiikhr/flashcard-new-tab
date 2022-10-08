import FindThemeHandler from './FindThemeHandler';
import { identifyColorScheme } from '../../../Domain/Modules/Settings/Service';
import { settingsQueryRepository } from '../../../Domain/Modules/Settings/Adapter/settingsQueryRepository';

const findTheme = new FindThemeHandler(
  settingsQueryRepository,
  identifyColorScheme,
);

export { findTheme };
