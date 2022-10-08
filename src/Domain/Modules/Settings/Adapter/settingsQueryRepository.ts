import { localStorage } from '../../../../Infrastructure/Persistence/LocalStorage';
import LSSettingsQueryRepository from '../../../../Infrastructure/Modules/Settings/Repository/LSSettingsQueryRepository';

const settingsQueryRepository = new LSSettingsQueryRepository(localStorage);

export { settingsQueryRepository };
