import LocalStorage from './LocalStorage';
import { logger } from '../../../Domain/Adapter/logger';

const localStorage = new LocalStorage(logger);

export { localStorage };
