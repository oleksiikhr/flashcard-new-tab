import { error } from '../../../../Domain/Shared/Util/logger';

export default class IndexedDB {
  private db: IDBDatabase | null = null;

  constructor(
    private name: string,
    private migrations: ((event: IDBVersionChangeEvent) => Promise<void>)[],
  ) {}

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
