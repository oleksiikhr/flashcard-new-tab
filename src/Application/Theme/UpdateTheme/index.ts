import UpdateThemeHandler from './UpdateThemeHandler';
import { settingsCommandRepository } from '../../../Domain/Modules/Settings/Adapter/settingsCommandRepository';

const updateTheme = new UpdateThemeHandler(settingsCommandRepository);

export { updateTheme };
