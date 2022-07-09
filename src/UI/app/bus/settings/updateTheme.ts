import UpdateThemeHandler from '../../../../Application/Command/Theme/UpdateThemeHandler';
import make from '../services';
import LSSettingsCommandRepository from '../../../../Infrastructure/Persistence/Settings/Repository/LSSettingsCommandRepository';

const handler = new UpdateThemeHandler(make(LSSettingsCommandRepository));

export default handler.invoke.bind(handler);
