import { openDB } from './idb';
import { database } from '../../config';
import migrations from './migrations';

let db: Promise<IDBDatabase> | null = null;

// eslint-disable-next-line no-return-assign
export const useConnection = () => (db ??= openDB(database.name, migrations));
