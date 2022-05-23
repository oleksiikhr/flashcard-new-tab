import { error } from '../../../Model/Util/logger';

export default class IndexedDB {
  private conn: IDBDatabase | null = null;

  constructor(
    private name: string,
    private migrations: ((event: IDBVersionChangeEvent) => Promise<void>)[]
  ) {}

  public request<T>(req: IDBRequest): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      req.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result as T;

        try {
          resolve(result);
        } catch (e) {
          reject(e);
        }
      };

      req.onerror = reject;
    });
  }

  public connection(): Promise<IDBDatabase> {
    if (null !== this.conn) {
      return Promise.resolve(this.conn);
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
    }).then((connection) => {
      this.conn = connection;

      return connection;
    });
  }
}
