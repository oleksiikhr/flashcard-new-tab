import Logger from '../../../../Domain/Shared/Service/Logger';

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

        migration(event).catch((err) => {
          this.logger.error('Migration failed', { error: err as Error });
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
}
