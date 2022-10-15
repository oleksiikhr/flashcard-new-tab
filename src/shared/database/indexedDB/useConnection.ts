import { openDB } from './idb';
import { databaseName } from '../../config/database';
import migrations from './migrations';

let db: Promise<IDBDatabase> | null = null;

// eslint-disable-next-line no-return-assign
export const useConnection = () => (db ??= openDB(databaseName, migrations));
