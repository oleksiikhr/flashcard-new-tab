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

export function requestPromise<T>(request: IDBRequest): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const result = (event.target as IDBRequest).result as T;

      try {
        resolve(result);
      } catch (e) {
        reject(e);
      }
    };

    request.onerror = (e) => reject(e);
  });
}

export default {
  requestPromise,
};
