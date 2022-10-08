import Logger from '../../../Domain/Service/Logger';

export default class IndexedDB {
  private db: IDBDatabase | null = null;

  constructor(
    private name: string,
    private migrations: ((event: IDBVersionChangeEvent) => Promise<void>)[],
    private logger: Logger,
  ) {}

  public openDB(): Promise<IDBDatabase> {
    if (null !== this.db) {
      return Promise.resolve(this.db);
    }

    return new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open(this.name, this.migrations.length);

      req.onupgradeneeded = (event) => {
        const migration = this.migrations[event.oldVersion];

        if (undefined === migration) {
          throw new Error(`Migration not found: v${event.oldVersion}`);
        }

        migration(event).catch((err: unknown) => {
          this.logger.error('IndexedDB', 'openDB', 'migration', {
            err,
          });
        });
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

  public requestPromise<T>(request: IDBRequest): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result as T;

        try {
          resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      request.onerror = (err) => reject(err);
    });
  }

  public requestPaginate<T>(request: IDBRequest, limit: number): Promise<T[]> {
    const data: T[] = [];

    return new Promise((resolve) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as
          | IDBCursorWithValue
          | undefined;

        if (!cursor) {
          resolve(data);
          return;
        }

        data.push(cursor.value as T);

        if (data.length < limit) {
          cursor.continue();
        } else {
          resolve(data);
        }
      };
    });
  }

  public requestRandom<T>(
    request: IDBRequest<IDBCursorWithValue | null>,
    offset: number,
  ): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      let searching = true;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest)
          .result as IDBCursorWithValue;

        if (searching && 0 !== offset) {
          searching = false;
          cursor.advance(offset);
        } else {
          resolve(cursor.value as T);
        }
      };

      request.onerror = reject;
    });
  }

  public requestKeyCursor(
    request: IDBRequest,
    callback: (primaryKey: number) => boolean | void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as
          | IDBCursorWithValue
          | undefined;

        if (!cursor) {
          resolve();
          return;
        }

        try {
          if (false === callback(cursor.primaryKey as number)) {
            resolve();
            return;
          }

          cursor.continue();
        } catch (err) {
          reject(err);
        }
      };

      request.onerror = reject;
    });
  }

  public requestCursor(
    request: IDBRequest,
    callback: (result: IDBCursorWithValue) => boolean | void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as
          | IDBCursorWithValue
          | undefined;

        if (!cursor) {
          resolve();
          return;
        }

        try {
          if (false === callback(cursor)) {
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      };

      request.onerror = reject;
    });
  }
}
