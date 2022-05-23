import LSSettingsQueryRepository from '../../Module/Core/Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';
import ThemeInjector from '../../Module/Core/Domain/Settings/Theme/Service/ThemeInjector';
import PageManager from '../../Module/Core/UI/PageManager';
import { indexedDB as idbConfig } from '../config/database';
import LocalStorage from '../../Module/Shared/Infrastructure/Persistence/LocalStorage/LocalStorage';
import list from '../../Module/Shared/Infrastructure/Persistence/IndexedDB/Migration/list';
import IndexedDB from '../../Module/Shared/Infrastructure/Persistence/IndexedDB/IndexedDB';
import LSSettingsCommandRepository from '../../Module/Core/Infrastructure/Persistence/Settings/Repository/LSSettingsCommandRepository';

const indexedDB = new IndexedDB(idbConfig.name, list);
const localStorage = new LocalStorage();

export const settingsQueryRepository = new LSSettingsQueryRepository(
  localStorage
);

export const settingsCommandRepository = new LSSettingsCommandRepository(
  localStorage
);

export const themeInjector = new ThemeInjector();

export const pageManager = new PageManager();

export default {
  settingsCommandRepository,
  settingsQueryRepository,
  themeInjector,
  pageManager,
};
