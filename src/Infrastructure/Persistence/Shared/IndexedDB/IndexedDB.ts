import { error } from '../../../../Domain/Shared/Util/logger';
import { random } from '../../../../Domain/Shared/Util/number';

export default class IndexedDB {
  private db: IDBDatabase | null = null;

  constructor(
    private name: string,
    private migrations: ((event: IDBVersionChangeEvent) => Promise<void>)[],
  ) {}

  public random<T>(
    request: IDBRequest<IDBCursorWithValue | null>,
    totalRecords: number,
  ): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      let searching = true;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest)
          .result as IDBCursorWithValue;

        if (searching && 1 !== totalRecords) {
          searching = false;
          cursor.advance(random(1, totalRecords - 1));
        } else {
          resolve(cursor.value as T);
        }
      };

      request.onerror = reject;
    });
  }

  public openDB(): Promise<IDBDatabase> {
    if (null !== this.db) {
      return Promise.resolve(this.db);
    }

    return new Promise<IDBDatabase>((resolve, reject) => {
      const req = window.indexedDB.open(this.name, this.migrations.length);

      req.onupgradeneeded = (event) => {
        this.migrations[event.oldVersion](event).catch(error);
      };

      req.onsuccess = (event) => {
        const database = (event.target as IDBOpenDBRequest).result;

        resolve(database);
      };

      req.onerror = reject;
    }).then((db) => {
      this.db = db;

      return db;
    });
  }
}
