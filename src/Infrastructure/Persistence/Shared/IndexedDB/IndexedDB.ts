import { error } from '../../../../Domain/Shared/Util/logger';
import { random } from '../../../../Domain/Shared/Util/number';

export default class IndexedDB {
  private db: IDBDatabase | null = null;

  constructor(
    private name: string,
    private migrations: ((event: IDBVersionChangeEvent) => Promise<void>)[]
  ) {}

  public random<T>(
    request: IDBRequest<IDBCursorWithValue | null>,
    total: number
  ): Promise<T | null> {
    return new Promise((resolve, reject) => {
      let searching = true;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest)
          .result as IDBCursorWithValue;

        if (searching) {
          searching = false;
          cursor.advance(random(1, total - 1));
        } else {
          try {
            resolve(cursor.value as T);
          } catch (e) {
            reject(e);
          }
        }
      };

      request.onerror = reject;
    });
  }

  public request<T>(request: IDBRequest): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result as T;

        try {
          resolve(result);
        } catch (e) {
          reject(e);
        }
      };

      request.onerror = reject;
    });
  }

  public database(): Promise<IDBDatabase> {
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
