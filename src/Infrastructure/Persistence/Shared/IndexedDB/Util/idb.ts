export function requestPaginate<T>(
  request: IDBRequest,
  limit: number,
): Promise<T[]> {
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

export function requestRandom<T>(
  request: IDBRequest<IDBCursorWithValue | null>,
  offset: number,
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    let searching = true;

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;

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

export function requestPromise<T>(request: IDBRequest): Promise<T | undefined> {
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

export function requestKeyCursor(
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

export function requestCursor(
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
