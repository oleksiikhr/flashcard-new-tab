import LSSettingsCommandRepository from '../../../../Infrastructure/Modules/Settings/Repository/LSSettingsCommandRepository';
import { localStorage } from '../../../../Infrastructure/Persistence/LocalStorage';

const settingsCommandRepository = new LSSettingsCommandRepository(localStorage);

export { settingsCommandRepository };
