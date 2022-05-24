import { warn } from '../../../Domain/Util/logger';
import { isObject } from '../../../Domain/Util/type';

export default class LocalStorage {
  public getObject<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (null === item) {
      return null;
    }

    let data = null;

    try {
      data = JSON.parse(item) as T | null;
    } catch (e) {
      warn(e);
      return null;
    }

    if (!isObject(data)) {
      warn(`This "${key}" key is not an object`);
      return null;
    }

    return data;
  }

  public setObject<T>(key: string, obj: T): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
