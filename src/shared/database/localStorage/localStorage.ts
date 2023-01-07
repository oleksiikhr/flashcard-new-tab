import { isObject } from '../../util/type';

export const getObject = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item === null) {
    return null;
  }

  let data: unknown;

  try {
    data = JSON.parse(item);
  } catch (err) {
    console.warn(err);
    return null;
  }

  if (!isObject(data)) {
    console.warn(`This "${key}" key is not an object`);
    return null;
  }

  return data as T;
};

export const setObject = <T>(key: string, obj: T): void => {
  localStorage.setItem(key, JSON.stringify(obj));
};
