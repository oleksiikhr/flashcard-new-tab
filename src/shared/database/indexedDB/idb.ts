import { randomUniqueRange } from '../../util/algorithm';

export const openDB = (
  databaseName: string,
  migrations: ((event: IDBVersionChangeEvent) => Promise<void>)[],
): Promise<IDBDatabase> =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(databaseName, migrations.length);

    req.onupgradeneeded = (event) => {
      const migration = migrations[event.oldVersion];

      if (undefined === migration) {
        throw new Error(`Migration not found: v${event.oldVersion}`);
      }

      migration(event).catch(console.error);
    };

    req.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      resolve(database);
    };

    req.onerror = reject;
  });

export const requestPromise = <T>(request: IDBRequest): Promise<T> =>
  new Promise((resolve, reject) => {
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

export const requestPaginate = <T>(
  request: IDBRequest,
  limit: number,
): Promise<T[]> => {
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
};

export const requestRandom = <T>(
  request: IDBRequest<IDBCursorWithValue | null>,
  offset: number,
): Promise<T | undefined> =>
  new Promise((resolve, reject) => {
    let searching = true;

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;

      if (searching && offset !== 0) {
        searching = false;
        cursor.advance(offset);
      } else {
        resolve(cursor.value as T);
      }
    };

    request.onerror = reject;
  });

export const requestKeyCursor = (
  request: IDBRequest,
  callback: (primaryKey: number) => boolean | void,
): Promise<void> =>
  new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as
        | IDBCursorWithValue
        | undefined;

      if (!cursor) {
        resolve();
        return;
      }

      try {
        if (callback(cursor.primaryKey as number) === false) {
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

export const requestCursor = (
  request: IDBRequest,
  callback: (result: IDBCursorWithValue) => boolean | void,
): Promise<void> =>
  new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as
        | IDBCursorWithValue
        | undefined;

      if (!cursor) {
        resolve();
        return;
      }

      try {
        if (callback(cursor) === false) {
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    };

    request.onerror = reject;
  });

export const requestRandomValues = async <T>(
  request: IDBIndex,
  query: IDBKeyRange,
  limit: number,
  callback: (value: unknown) => T,
) => {
  const total = await requestPromise<number>(request.count(query));
  const numbers = randomUniqueRange(total, limit, 1);
  const values: T[] = [];
  let init = true;

  await requestCursor(request.openCursor(query), (cursor) => {
    if (init && numbers[0] !== 1) {
      init = false;

      // @ts-ignore
      return cursor.advance(numbers[0] - 1);
    }

    const value = callback(cursor.value);

    if (values.push(value) === numbers.length) {
      return false;
    }

    // @ts-ignore
    return cursor.advance(numbers[values.length] - numbers[values.length - 1]);
  });

  return values;
};
