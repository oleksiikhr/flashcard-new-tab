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
