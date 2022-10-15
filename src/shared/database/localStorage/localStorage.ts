import { isObject } from '../../util/type';

export const getObject = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (null === item) {
    return null;
  }

  let data;

  try {
    data = JSON.parse(item) as T;
  } catch (err) {
    console.warn(err);
    return null;
  }

  if (!isObject(data)) {
    console.warn(`This "${key}" key is not an object`);
    return null;
  }

  return data;
};

export const setObject = <T>(key: string, obj: T): void => {
  localStorage.setItem(key, JSON.stringify(obj));
};
